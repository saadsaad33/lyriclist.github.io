const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Replace with your actual API keys
const geniusApiKey = 'dSEz7Zs3FJzNvwyEDivB2uJAttw6oq7MgvONWdj8CyTrQ2exbQiJ9jZckOWo62tWbGgn4uzhGoHwcjPIBJ25Aw';
const lastfmApiKey = 'b8323903872df412ea5c9591caa23f2';

// Endpoint to fetch song lyrics from Genius API
app.get('/api/lyrics/:songId', async (req, res) => {
    try {
        const songId = req.params.songId;
        const response = await axios.get(`https://api.genius.com/songs/${songId}`, {
            headers: {
                Authorization: `Bearer ${geniusApiKey}`
            }
        });
        const lyrics = response.data.response.song.lyrics;
        res.json({ lyrics });
    } catch (error) {
        console.error('Error fetching lyrics:', error);
        res.status(500).json({ error: 'Failed to fetch lyrics' });
    }
});

// Endpoint to fetch artist info from Last.fm API
app.get('/api/artist/:artistName', async (req, res) => {
    try {
        const artistName = req.params.artistName;
        const response = await axios.get(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artistName}&api_key=${lastfmApiKey}&format=json`);
        const artistInfo = response.data.artist;
        res.json({ artistInfo });
    } catch (error) {
        console.error('Error fetching artist info:', error);
        res.status(500).json({ error: 'Failed to fetch artist info' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
