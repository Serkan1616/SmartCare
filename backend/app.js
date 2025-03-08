// app.js
const express = require('express');
const cors = require('cors');
const axios = require("axios")

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// GET isteğinde "Hello World" mesajı gönderiyoruz.
app.get('/', (req, res) => {
    res.send('Hello World with axios');
});

// New POST endpoint for prediction
app.post('/predict', async (req, res) => {
    try {
        // Get the input data from the request body
        const inputData = req.body;

        // Call the Python microservice
        const response = await axios.post('http://localhost:8000/predict', inputData);

        // Return the prediction result to the client
        res.json(response.data);
    } catch (error) {
        console.error('Error in prediction:', error.message);
        res.status(500).json({ error: 'Prediction error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server ${PORT} portunda çalışıyor!`);
});
