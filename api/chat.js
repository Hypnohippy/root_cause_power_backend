const axios = require('axios');

export default async function handler(req, res) {
  // Enable CORS for your Wix site
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, coachType, userContext } = req.body;

    // Your Groq API call
    const groqResponse = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
      model: 'llama3-8b-8192',
      messages: [
        {
          role: 'system',
          content: getCoachPrompt(coachType)
        },
        {
          role: 'user', 
          content: `Context: ${userContext || 'No previous context'}\n\nUser message: ${message}`
        }
      ],
      max_tokens: 500,
      temperature: 0.7
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const aiResponse = groqResponse.data.choices[0].message.content;

    res.status(200).json({ 
      response: aiResponse,
      status: 'connected'
    });

  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ 
      error: 'AI service temporarily unavailable',
      status: 'error'
    });
  }
}

function getCoachPrompt(coachType) {
  const prompts = {
    nutrition: 'You are a compassionate nutrition specialist helping with personalized meal planning and dietary advice.',
    sleep: 'You are a sleep specialist providing evidence-based sleep improvement strategies.',
    stress: 'You are a stress management expert offering practical techniques for stress reduction.',
    fitness: 'You are a fitness coach creating personalized exercise programs.',
    supplements: 'You are a supplement advisor providing evidence-based supplement recommendations.',
    ptsd: 'You are a trauma-informed PTSD specialist. Be extremely gentle, supportive, and recognize crisis situations immediately. Always validate feelings and provide grounding techniques when needed.'
  };
  
  return prompts[coachType] || prompts.ptsd;
}
