const mongoose = require('mongoose');

// Define a Mongoose schema for sensor data
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

module.exports = Sensor;
