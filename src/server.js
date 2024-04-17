const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/api/players', async (req, res) => {
  try {
    const response = await axios.get('https://www.balldontlie.io/api/v1/players', {
      headers: {
        Authorization: `Bearer afe25e37-3a9d-4920-a7fe-3aa9148367af`
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});