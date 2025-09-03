export default async function handler(req, res) {
  // Enhanced CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Max-Age', '86400');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Test endpoint
  if (req.method === 'GET') {
    return res.status(200).json({ 
      message: 'AI Backend is running!', 
      status: 'connected',
      timestamp: new Date().toISOString()
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, coachType = 'ptsd' } = req.body || {};

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Test response
    const response = `I hear you saying "${message}". I'm here to support you. This is a real AI response from your backend! How can I help you further?`;

    res.status(200).json({ 
      response: response,
      status: 'connected',
      backend: 'vercel',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ 
      error: 'Service error: ' + error.message,
      status: 'error'
    });
  }
}
