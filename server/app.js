const express = require("express");
const path = require("path");
const WebSocket = require("ws");
const app = express();
const port = 3000;

// Serve static files from the 'client' directory
app.use(express.static(path.join(__dirname, "../client")));

// Define routes
const mainRoutes = require("./routes/mainRoutes");
app.use("/", mainRoutes);

// Create an HTTP server
const server = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

// Create a WebSocket server
const wss = new WebSocket.Server({ server });

// Handle WebSocket connections
wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (message) => {
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        // Forward the message as a string
        client.send(message.toString());
      }
    });
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

