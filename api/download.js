const { get, list } = require('@vercel/blob');
const { Readable } = require('node:stream');
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
  // Keep explicit authorized mappings working, but automatically discover files
  // uploaded to the connected private Blob store when no mapping exists.
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

      if (candidate === wanted) {
        exact.push({ pathname, year: yearFromPath(base) });
      } else if (candidate.includes(wanted) || wanted.includes(candidate)) {
        close.push({ pathname, year: yearFromPath(base) });
      }
    }

    if (!result?.hasMore || !result?.cursor) break;
    cursor = result.cursor;
  }

  // Prefer an exact title with the requested year when one is available.
  if (wantedYear) {
    const exactYear = exact.find(item => item.year === wantedYear);
    if (exactYear) return exactYear.pathname;
  }
  if (exact.length === 1) return exact[0].pathname;

  // A fuzzy match is only accepted when it is unambiguous. This prevents a
  // similar title from silently receiving another movie's authorized file.
  if (close.length === 1) return close[0].pathname;
  return null;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const title = String(req.query?.title || '').trim();
  const year = String(req.query?.year || '').trim();
  if (!title || title === '_README') {
    return res.status(404).json({ error: 'No movie title was supplied.' });
  }

  try {
    const pathname = await findBlobForTitle(title, year);

    // Lightweight availability check used by the movie and download pages.
    if (String(req.query?.check || '') === '1') {
      return res.status(200).json({ available: Boolean(pathname), title, year: year || null });
    }

    if (!pathname) {
      return res.status(404).json({ error: 'No authorized download is connected for this title.' });
    }

    // Private Blob files are fetched server-side and streamed to the visitor.
    // This route is intentionally limited to files discovered from the
    // authorized Blob store; it never accepts an arbitrary external URL.
    const result = await get(pathname, {
      access: 'private',
      token: process.env.BLOB_READ_WRITE_TOKEN || undefined
    });

    if (!result || result.statusCode !== 200) {
      return res.status(404).json({ error: 'The authorized file could not be found in storage.' });
    }

    const extension = pathname.includes('.') ? pathname.slice(pathname.lastIndexOf('.')) : '';

    res.statusCode = 200;
    res.setHeader('Content-Type', result.blob.contentType || 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(title)}${extension}"`);
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Cache-Control', 'private, no-store');

    Readable.fromWeb(result.stream).pipe(res);
  } catch (error) {
    console.error('CineVault download error:', error);
    return res.status(500).json({ error: 'Download service is temporarily unavailable.' });
  }
};
