const Sensor = require('../model/dataModel');

// Handle saving sensor data and broadcasting it via WebSocket
exports.handleSensorData = async (ws, message, wss) => {
  try {
    // Convert Buffer to string
    const data = JSON.parse(message.toString());

    console.log('Received:', data);

    // Save data to MongoDB using Mongoose
    const sensorData = new Sensor(data);
    await sensorData.save();
    console.log('Sensor data saved to MongoDB');

    // Broadcast the received data to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  } catch (err) {
    console.error('Error handling WebSocket message:', err);
  }
};
