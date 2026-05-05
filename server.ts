import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  app.use(express.json());
  const PORT = 3000;

  const AGENT_API_MAP: Record<string, string> = {
    'Sarah': 'https://flowise.aiolosmedia.com/api/v1/prediction/1600fdb2-2d41-48d0-b8b8-12e4f521ee7b',
    'Elias': 'https://flowise.aiolosmedia.com/api/v1/prediction/ffc08529-cd30-4ce1-afca-1abe5f9149c5',
    'Maya':  'https://flowise.aiolosmedia.com/api/v1/prediction/7bf044c4-162b-4466-8ebc-e5689b87d3ea',
    'Vince': 'https://flowise.aiolosmedia.com/api/v1/prediction/fb170a66-116b-4c7b-80b7-f784c78add47',
    'Bella': 'https://flowise.aiolosmedia.com/api/v1/prediction/4dd56503-fd61-4090-aa3d-0e24d7011c98',
    'Penny': 'https://flowise.aiolosmedia.com/api/v1/prediction/4a129e23-31c9-4a78-8089-da37d137d451'
  };

  app.post('/api/chat', async (req, res) => {
    const { question, agentName } = req.body;
    try {
      const apiUrl = AGENT_API_MAP[agentName];
      if (!apiUrl) {
         return res.status(400).json({ text: "Invalid agent." });
      }

      if (!process.env.FLOWISE_API_TOKEN) {
        console.error('FLOWISE_API_TOKEN is not defined in environment variables.');
        return res.status(500).json({ text: "Chat service configuration error." });
      }
      
      const response = await axios.post(apiUrl, {
        question
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.FLOWISE_API_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });
      return res.json({ text: response.data.text });
    } catch (error: any) {
      console.error('Chat API Error:', error.message);
      let status = 500;
      let message = "Error connecting to chat service.";
      
      if (error.response) {
        console.error('Chat API Response Data:', error.response.data);
        console.error('Chat API Response Status:', error.response.status);
        // Pass through the status if available, e.g., 401 Unauthorized
        status = error.response.status;
        message = `Chat service error (${status}): ${typeof error.response.data === 'string' ? JSON.stringify(error.response.data) : 'Check API token'}`;
      } else if (error.request) {
        console.error('Chat API Request Error:', error.request);
        message = 'No response received from chat service.';
      } else {
        console.error('Chat API Error Message:', error.message);
        message = `Chat service error: ${error.message}`;
      }
      res.status(status).json({ text: message });
    }
  });

  // API route for YouTube
  app.get('/api/youtube-news', async (req, res) => {
    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) {
      console.warn('YOUTUBE_API_KEY not set, returning empty news list');
      return res.json([]);
    }

    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          key: apiKey,
          q: 'GTA real estate market update',
          part: 'snippet',
          type: 'video',
          maxResults: 6,
          order: 'date'
        }
      });
      res.json(response.data.items || []);
    } catch (error) {
      console.error('YouTube API Error:', error);
      res.json([]);
    }
  });

  // Vite middleware
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
