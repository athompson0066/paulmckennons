// Vercel Serverless Function - Proxy to Flowise
// This avoids CORS issues by proxying requests through same domain

const FLOWISE_URL = 'https://flowise.aiolosmedia.com';

// Agent chatflow IDs
const AGENT_IDS = {
  Paul: '265fe4cd-2e87-437c-8633-ac4ee8f1fb3d',
  Maya: 'b2332d63-511e-484a-afc7-a1a570462111',
  Elias: 'ffc08529-cd30-4ce1-afca-1abe5f9149c5',
  Sarah: '1600fdb2-2d41-48d0-b8b8-12e4f521ee7b',
  Vince: 'fb170a66-116b-4c7b-80b7-f784c78add47',
  Bella: '4dd56503-fd61-4090-aa3d-0e24d7011c98',
  Penny: '4a129e23-31c9-4a78-8089-da37d137d451',
  Sade: 'c0423c15-71cd-471a-857f-793d286dfc69',
};

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { agent, message, sessionId } = req.body;

  if (!agent || !message) {
    return res.status(400).json({ error: 'Missing agent or message' });
  }

  const chatflowId = AGENT_IDS[agent];
  if (!chatflowId) {
    return res.status(400).json({ error: 'Invalid agent name' });
  }

  try {
    const response = await fetch(`${FLOWISE_URL}/api/v1/prediction/${chatflowId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: message,
        overrideConfig: {
          sessionId: sessionId || `web-${Date.now()}`,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Flowise API error: ${response.status}`);
    }

    const data = await response.json();
    return res.status(200).json({
      text: data.text || data.response || "I'm processing your request...",
      agent,
      sessionId: sessionId || `web-${Date.now()}`,
    });
  } catch (error) {
    console.error('Chat proxy error:', error);
    return res.status(500).json({
      text: "I'm currently offline. Please try again in a moment, or contact Paul directly at (416) 567-7253.",
      error: error.message,
    });
  }
}
