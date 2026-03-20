const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// Serve React frontend
app.use(express.static(path.join(__dirname, 'client', 'build')));

// Sample API
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

// Catch-all for React routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
