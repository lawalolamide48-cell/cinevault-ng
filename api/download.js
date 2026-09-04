const { issueSignedToken, presignUrl } = require('@vercel/blob');
const downloads = require('../downloads.json');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const title = String(req.query?.title || '').trim();
  const pathname = downloads[title];

  if (!title || !pathname || title === '_README') {
    return res.status(404).json({ error: 'No authorized download is connected for this title.' });
  }

  try {
    // Private Blob signed URLs must be scoped to the exact pathname and operation.
    const validUntil = Date.now() + 10 * 60 * 1000;
    const token = await issueSignedToken({
      pathname,
      operations: ['get'],
      validUntil
    });

    const { presignedUrl } = await presignUrl(token, {
      pathname,
      operation: 'get',
      validUntil
    });

    if (!presignedUrl) throw new Error('Vercel Blob did not return a presigned URL.');
    return res.redirect(302, presignedUrl);
  } catch (error) {
    console.error('CineVault download error:', error);
    return res.status(500).json({ error: 'Download service is temporarily unavailable.' });
  }
};
