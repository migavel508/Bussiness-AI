const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

const genAI = new GoogleGenerativeAI('AIzaSyBORnwVH81KUWR1oJ0UnmZNYNUxfut_jug');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post('/api/generate', async (req, res) => {
  const { prompt } = req.body;

  try {
    const result = await model.generateContent(prompt);
    res.json({ output: result.response.text() });
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({ error: 'Error generating content' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
