 import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: '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'
});

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json'
};

export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).json({ message: 'OK' });
  }

  // Health check for GET requests
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
    const { message, conversation_history = [], coach_type = 'general' } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Build conversation context
    const messages = [];
    
    // System prompt based on coach type
    const systemPrompts = {
      ptsd: `You are a trauma-informed AI therapist specializing in PTSD and CPTSD support. You provide compassionate, evidence-based guidance while maintaining professional boundaries. You recognize crisis situations and provide appropriate resources. Speak with warmth, validation, and hope.`,
      nutrition: `You are a certified nutrition coach specializing in lifestyle medicine. You provide evidence-based nutritional guidance, meal planning, and help clients understand the connection between nutrition and overall wellbeing.`,
      sleep: `You are a sleep specialist focused on helping people optimize their sleep quality and recovery. You understand the connection between sleep, mental health, and overall wellness.`,
      stress: `You are a stress management expert specializing in evidence-based techniques for reducing stress and improving mental wellbeing through lifestyle interventions.`,
      fitness: `You are a fitness coach specializing in therapeutic exercise and movement for overall health and mental wellbeing. You understand trauma-informed approaches to fitness.`,
      supplements: `You are a supplement advisor with expertise in evidence-based nutritional supplementation for health optimization and mental wellbeing.`,
      general: `You are a compassionate AI wellness coach trained in lifestyle medicine principles. You provide supportive, evidence-based guidance for holistic health and wellbeing.`
    };

    messages.push({
      role: 'system',
      content: systemPrompts[coach_type] || systemPrompts.general
    });

    // Add conversation history
    if (conversation_history && conversation_history.length > 0) {
      conversation_history.forEach(msg => {
        messages.push({
          role: msg.role,
          content: msg.content
        });
      });
    }

    // Add current user message
    messages.push({
      role: 'user',
      content: message
    });

    // Call Groq API
    const completion = await groq.chat.completions.create({
      messages: messages,
      model: 'llama3-8b-8192',
      temperature: 0.7,
      max_tokens: 1000,
      top_p: 1,
      stream: false
    });

    const aiResponse = completion.choices[0]?.message?.content;

    if (!aiResponse) {
      throw new Error('No response from AI');
    }

    // Return pure AI response
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Content-Type', 'application/json');
    
    return res.status(200).json({
      response: aiResponse,
      status: 'success',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Groq API Error:', error);
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    
    return res.status(500).json({
      error: 'Failed to get AI response',
      details: error.message,
      timestamp: new Date().toISOString()
    });
  }
}
