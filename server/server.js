const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);

// Set up WebSocket server
const wss = new WebSocket.Server({ server });

// MongoDB connection using Mongoose
mongoose.connect('mongodb://localhost:27017/submarineDB').then(() => {
  console.log('Connected to MongoDB with Mongoose');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Define a Mongoose schema and model for sensor data
const sensorSchema = new mongoose.Schema({
  temperature_celsius: Number,
  temperature_kelvin: Number,
  tds_value: Number,
  latitude: Number,
  longitude: Number,
  speed: Number,
  timestamp: { type: Date, default: Date.now }
});

const Sensor = mongoose.model('Sensor', sensorSchema);

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

  ws.on('message', async (message) => {
    // Convert Buffer to string
    const data = JSON.parse(message.toString());

    console.log('Received:', data);

    // Save data to MongoDB using Mongoose
    try {
      const sensorData = new Sensor(data);
      await sensorData.save();
      console.log('Sensor data saved to MongoDB');
    } catch (err) {
      console.error('Error saving sensor data to MongoDB:', err);
    }

    // Broadcast the received data to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
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
