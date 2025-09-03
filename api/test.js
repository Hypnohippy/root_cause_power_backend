export default function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Simple test response
  res.status(200).json({
    message: 'Hello from Vercel API!',
    method: req.method,
    timestamp: new Date().toISOString(),
    status: 'working'
  });
}
