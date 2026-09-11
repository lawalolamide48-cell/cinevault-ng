const { list, issueSignedToken, presignUrl } = require('@vercel/blob');
const downloads = require('../downloads.json');

const norm = value => String(value || '')
  .toLowerCase()
  .replace(/[’‘`]/g, "'")
  .replace(/\.[a-z0-9]{2,5}$/i, '')
  .replace(/[^a-z0-9]+/g, ' ')
  .trim();

const titleKey = value => norm(value)
  .replace(/\b(19|20)\d{2}\b/g, '')
  .replace(/\s+/g, ' ')
  .trim();

const yearFromPath = value => {
  const match = String(value || '').match(/\b(19|20)\d{2}\b/);
  return match ? match[0] : '';
};

async function findBlobForTitle(title, year = '') {
  const manifestPath = downloads[title];
  if (manifestPath) return manifestPath;

  const wanted = titleKey(title);
  if (!wanted) return null;
  const wantedYear = String(year || '').match(/^(19|20)\d{2}$/)?.[0] || '';
  const exact = [];
  const close = [];

  let cursor;
  for (let page = 0; page < 10; page++) {
    const result = await list({
      ...(cursor ? { cursor } : {}),
      token: process.env.BLOB_READ_WRITE_TOKEN || undefined
    });

    const blobs = Array.isArray(result?.blobs) ? result.blobs : [];
    for (const blob of blobs) {
      const pathname = blob?.pathname || '';
      const base = pathname.split('/').pop() || pathname;
      const candidate = titleKey(base);
      if (!candidate) continue;
      const item = { pathname, year: yearFromPath(base) };

      if (candidate === wanted) exact.push(item);
      else if (candidate.includes(wanted) || wanted.includes(candidate)) close.push(item);
    }

    if (!result?.hasMore || !result?.cursor) break;
    cursor = result.cursor;
  }

  if (wantedYear) {
    const exactYear = exact.find(item => item.year === wantedYear);
    if (exactYear) return exactYear.pathname;
    const closeYear = close.filter(item => item.year === wantedYear);
    if (closeYear.length === 1) return closeYear[0].pathname;
  }

  if (exact.length === 1) return exact[0].pathname;
  if (close.length === 1) return close[0].pathname;
  return null;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const title = String(req.query?.title || '').trim();
  const year = String(req.query?.year || '').trim();
  const prepare = String(req.query?.prepare || '') === '1';
  if (!title || title === '_README') return res.status(404).json({ error: 'No movie title was supplied.' });

  try {
    const pathname = await findBlobForTitle(title, year);

    if (String(req.query?.check || '') === '1') {
      return res.status(200).json({ available: Boolean(pathname), title, year: year || null });
    }

    if (!pathname) {
      return res.status(404).json({ error: 'No authorized download is connected for this title.' });
    }

    // Generate a short-lived, GET-only signed URL so the browser downloads
    // directly from private Blob storage instead of streaming the full movie
    // through a Vercel function.
    const validUntil = Date.now() + 10 * 60 * 1000;
    const token = await issueSignedToken({
      pathname,
      operations: ['get'],
      validUntil
    });
    const { presignedUrl } = await presignUrl(token, {
      operation: 'get',
      pathname,
      access: 'private',
      validUntil
    });

    if (prepare) {
      return res.status(200).json({
        available: true,
        title,
        year: year || null,
        expiresAt: validUntil,
        url: presignedUrl
      });
    }

    // Preserve the old endpoint behavior for simple links while still using
    // the signed URL. The browser follows the redirect and Blob serves the
    // large file directly.
    res.statusCode = 302;
    res.setHeader('Location', presignedUrl);
    res.setHeader('Cache-Control', 'private, no-store');
    return res.end();
  } catch (error) {
    console.error('CineVault download error:', error);
    return res.status(500).json({ error: 'Download service is temporarily unavailable.' });
  }
};
