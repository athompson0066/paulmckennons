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

  app.post('/api/chat', async (req, res) => {
    const { question, agentName } = req.body;
    try {
      if (agentName === 'Maya') {
          const response = await axios.post('https://flowise.aiolosmedia.com/api/v1/prediction/7bf044c4-162b-4466-8ebc-e5689b87d3ea', {
            question
          }, {
            headers: {
              'Authorization': `Bearer ${process.env.FLOWISE_API_TOKEN}`,
              'Content-Type': 'application/json'
            }
          });
          return res.json({ text: response.data.text });
      }
      res.json({ text: "Hello! I am " + agentName + ". How can I help you?" });
    } catch (error: any) {
      console.error('Chat API Error:', error.message);
      if (error.response) {
        console.error('Chat API Response Data:', error.response.data);
      }
      res.status(500).json({ text: "Error connecting to service." });
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
