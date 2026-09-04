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

async function findBlobForTitle(title) {
  // Keep the existing manifest working, but no longer require manual entries.
  const manifestPath = downloads[title];
  if (manifestPath) return manifestPath;

  const wanted = titleKey(title);
  if (!wanted) return null;

  let cursor;
  for (let page = 0; page < 10; page++) {
    const result = await list({
      ...(cursor ? { cursor } : {}),
      token: process.env.BLOB_READ_WRITE_TOKEN || undefined
    });

    const blobs = Array.isArray(result?.blobs) ? result.blobs : [];
    const match = blobs.find(blob => {
      const pathname = blob?.pathname || '';
      const base = pathname.split('/').pop() || pathname;
      const candidate = titleKey(base);
      return candidate === wanted || candidate.includes(wanted) || wanted.includes(candidate);
    });

    if (match?.pathname) return match.pathname;
    if (!result?.hasMore || !result?.cursor) break;
    cursor = result.cursor;
  }

  return null;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const title = String(req.query?.title || '').trim();
  if (!title || title === '_README') {
    return res.status(404).json({ error: 'No movie title was supplied.' });
  }

  try {
    const pathname = await findBlobForTitle(title);

    // Lightweight availability check used by the movie and download pages.
    if (String(req.query?.check || '') === '1') {
      return res.status(200).json({ available: Boolean(pathname), title });
    }

    if (!pathname) {
      return res.status(404).json({ error: 'No authorized download is connected for this title.' });
    }

    // Private Blob files are fetched server-side and streamed to the visitor.
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
