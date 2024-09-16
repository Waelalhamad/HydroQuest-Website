const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const passport = require("passport");
const session = require("express-session");
const flash = require("express-flash");

const dashboardRoutes = require('./router/DataRouter');
const { handleSensorData } = require('./controller/DataController');
const ConnectionDb = require("./config/db")
const passportInit = require("./config/passport")
const authRouter = require("./router/authRouter")

// Initialize Express app and HTTP server
const app = express();
const server = http.createServer(app);

// Set up WebSocket server
const wss = new WebSocket.Server({ server });



passportInit(passport);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie:{
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Serve static files from the "public" directory
app.use(express.static('public'));

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Use the router for dashboard-related routes
app.use('/', dashboardRoutes);
app.use("/auth" , authRouter)

// WebSocket connection
wss.on('connection', (ws) => {
  console.log('New WebSocket connection');

  ws.on('message', (message) => {
    handleSensorData(ws, message, wss);
  });

  ws.on('close', () => {
    console.log('WebSocket connection closed');
  });
});

// Start the server on port 3000
ConnectionDb()
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
