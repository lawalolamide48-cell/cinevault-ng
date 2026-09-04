const { get } = require('@vercel/blob');
const { Readable } = require('node:stream');
const downloads = require('../downloads.json');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const title = String(req.query?.title || '').trim();
  const pathname = downloads[title];

  if (!title || !pathname || title === '_README') {
    return res.status(404).json({ error: 'No authorized download is connected for this title.' });
  }

  try {
    // Private Blob files are fetched server-side and streamed to the visitor.
    // When the store is connected to Vercel, the Blob SDK can use Vercel's
    // short-lived OIDC credentials automatically. A legacy read-write token
    // is also accepted if one exists in the project environment.
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
