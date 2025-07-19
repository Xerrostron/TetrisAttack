// server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (HTML/CSS/JS) from the 'public' folder
app.use(express.static('public'));

// Placeholder route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
