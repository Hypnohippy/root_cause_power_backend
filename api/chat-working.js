
Ultra Simple Groq Backend
Minimal code to prevent loops and echoing

// File: chat-simple.js
import Groq from 'groq-sdk';

export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    try {
        const { message } = req.body;
        if (!message) return res.status(400).json({ error: 'Message required' });

        // Initialize Groq with environment variable
        const groq = new Groq({
            apiKey: process.env.GROQ_KEY || process.env.API_KEY || process.env.GROQ_API_KEY
        });

        // Simple single request to Groq - no history, no loops
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are a helpful wellness coach. Provide supportive, professional responses. Do not mention backends, systems, or technical details."
                },
                {
                    role: "user", 
                    content: message
                }
            ],
            model: "llama3-8b-8192",
            temperature: 0.8,
            max_tokens: 500
        });

        // Return ONLY the AI response - nothing else
        const response = completion.choices[0]?.message?.content || "I'm here to help you.";
        
        res.json({ response });

    } catch (error) {
        console.error('Groq API Error:', error);
        res.status(500).json({ error: 'AI service temporarily unavailable' });
    }
}
🔧 Instructions:
1. Copy the code above
2. Create new file in GitHub: chat-simple.js
3. Paste the code and commit
4. Your endpoint: https://root-cause-power-backend.vercel.app/chat-simple.js
✅ What this fixes:
No conversation history loops
No echoing user input
Single request/response only
Pure Groq responses
Secure environment variables
Minimal code = fewer bugs
⚡ Ultra Simple Logic:
Input: User message

Process: Send to Groq API once

Output: Pure AI response

No loops, no history, no complications!
