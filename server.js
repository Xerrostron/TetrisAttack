const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;

// Serve everything inside "public" folder as static files
app.use(express.static(path.join(__dirname, 'public')));

// Optional: fallback to index.html for unmatched routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
