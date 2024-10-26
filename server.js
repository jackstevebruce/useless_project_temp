const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const GenAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = GenAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

app.use(cors());
app.use(bodyParser.json());

app.post('/api/imitate', async (req, res) => {
    const { input } = req.body;
    const prompt = `Complain to me about your life as the following animal / being showing common behavioural traits shown by the animal / beings: ${input}`;
    console.log('Received input:', input);

    try {
        const result = await model.generateContent(prompt);
        const explanation = typeof result?.response?.text === 'function' 
            ? result.response.text().trim() 
            : "No valid response received";
        console.log('Gemini response:', explanation);
        res.json({ explanation });
    } catch (error) {
        console.error('Error during Gemini API request:', error);
        res.status(500).json({ error: 'Error generating explanation.', details: error.message });
    }
});

module.exports = app;
