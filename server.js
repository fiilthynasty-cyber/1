// server.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
// import OpenAI or Gemini SDK here if needed
// import OpenAI from 'openai';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// __dirname setup for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Serve frontend (React/Vue/etc build folder)
app.use(express.static(path.join(__dirname, 'dist')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Example API route: Gemini/OpenAI placeholder
app.post('/api/predict', async (req, res) => {
  const { prompt } = req.body;

  // Here you would call Gemini/OpenAI API
  // Example using OpenAI:
  // const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });
  // const response = await openai.chat.completions.create({ ... });
  
  const result = { text: `You sent: ${prompt}` };
  res.json(result);
});

// Test route
app.get('/api/test', (req, res) => {
  res.send('Hello from VC backend API!');
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
