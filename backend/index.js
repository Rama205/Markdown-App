const express = require('express');
const cors = require('cors');
const marked = require('marked'); 
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000; 
app.use(cors());
app.use(express.json()); 


app.post('/convertText', (req, res) => {
    const markdownText = req.body.text; 

    if (!markdownText) {
        return res.status(400).json({ error: 'Markdown text is required' });
    }

    console.log('Received Markdown:', markdownText);

    try {
        const html = marked(markdownText); 
        res.json({ html });
    } catch (error) {
        console.error('Error converting markdown:', error);
        res.status(500).json({ error: 'Error converting markdown', details: error.message });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
