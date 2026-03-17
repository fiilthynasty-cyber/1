import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { refinePrompt, getAutocompleteSuggestions, spinCasino } from './services/aiService.js';

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || '*';

app.use(cors({ origin: FRONTEND_URL, methods: ['GET','POST'] }));
app.use(bodyParser.json());

app.get('/api/test', (req, res) => res.json({ ok: true }));

app.post('/api/autocomplete', async (req, res) => {
    try {
        const { task } = req.body;
        const result = await getAutocompleteSuggestions(task);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/refinePrompt', async (req, res) => {
    try {
        const { components, creativityLevel } = req.body;
        const result = await refinePrompt(components, creativityLevel);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/spinCasino', async (req, res) => {
    try {
        const result = await spinCasino();
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => console.log(Server running on port ));
