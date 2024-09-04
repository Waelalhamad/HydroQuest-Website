const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);

// Set up WebSocket server
const wss = new WebSocket.Server({ server });

// Serve static files from the "public" directory
app.use(express.static('public'));

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Render the dashboard when accessing the root route
app.get('/dashboard', (req, res) => {
  res.render('dashboard');
});
app.get('/', (req, res) => {
  res.render('index');
});

// WebSocket connection
wss.on('connection', (ws) => {
  console.log('New WebSocket connection');

  ws.on('message', (message) => {
    // Convert Buffer to string
    const data = message.toString();

    console.log('Received:', data);

    // Broadcast the received data to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });

  ws.on('close', () => {
    console.log('WebSocket connection closed');
  });
});

// Start the server on port 3000
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
