// server.js
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// Serve React build files
app.use(express.static(path.join(__dirname, 'client/build')));

// Example API endpoint
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

// Catch-all to serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
