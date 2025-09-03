
Secure Groq Backend Code
Uses environment variables - no hardcoded API keys!

📁 File: api/chat-secure.js
Copy Code
// Secure Groq API Backend for Vercel
// Uses environment variables - no hardcoded keys!

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    // Only allow POST requests for chat
    if (req.method !== 'POST') {
        if (req.method === 'GET') {
            return res.status(200).json({
                message: "Secure AI Backend is running!",
                status: "connected",
                timestamp: new Date().toISOString()
            });
        }
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    try {
        // Get API key from environment variables (secure!)
        const apiKey = process.env.GROQ_KEY || process.env.API_KEY;
        
        if (!apiKey) {
            console.error('API key not found in environment variables');
            return res.status(500).json({ 
                error: 'Server configuration error',
                message: 'API key not configured'
            });
        }
        
        // Get message from request
        const { message, conversation_history = [] } = req.body;
        
        if (!message) {
            return res.status(400).json({ 
                error: 'Bad request',
                message: 'Message is required'
            });
        }
        
        // Prepare conversation for Groq API
        const messages = [
            {
                role: "system",
                content: "You are a compassionate wellness coach specializing in trauma-informed care. Provide supportive, professional responses without mentioning technical details about systems or backends. Focus on the person's wellbeing and offer practical guidance."
            },
            ...conversation_history,
            {
                role: "user",
                content: message
            }
        ];
        
        // Call Groq API
        const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'llama3-8b-8192',
                messages: messages,
                temperature: 0.8,
                max_tokens: 500,
                top_p: 0.9,
                stream: false
            })
        });
        
        if (!groqResponse.ok) {
            const errorData = await groqResponse.text();
            console.error('Groq API Error:', errorData);
            
            if (groqResponse.status === 401) {
                return res.status(500).json({
                    error: 'Authentication failed',
                    message: 'Please check API key configuration'
                });
            }
            
            return res.status(500).json({
                error: 'AI service unavailable',
                message: 'Please try again in a moment'
            });
        }
        
        const data = await groqResponse.json();
        
        // Extract clean response (no wrapper messages!)
        const aiResponse = data.choices[0]?.message?.content || 'I apologize, but I encountered an issue processing your message. Please try again.';
        
        // Return clean response
        return res.status(200).json({
            response: aiResponse,
            status: 'success',
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        console.error('Backend Error:', error);
        
        return res.status(500).json({
            error: 'Internal server error',
            message: 'An unexpected error occurred. Please try again.',
            timestamp: new Date().toISOString()
        });
    }
}
How to Deploy:
1. Copy the code above
2. In GitHub, create new file: api/chat-secure.js
3. Paste the secure code
4. Commit the file
5. Vercel will auto-deploy!
Security Features:
Uses environment variables (secure)
No hardcoded API keys
Proper error handling
CORS enabled
Clean responses (no system mentions)
Your New Endpoint:
https://root-cause-power-backend.vercel.app/api/chat-secure.js

Update your frontend to use this secure endpoint!

Copy Secure Backend Code
