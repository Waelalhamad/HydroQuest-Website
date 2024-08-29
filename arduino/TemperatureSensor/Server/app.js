const express = require('express');
const bodyParser = require('body-parser');
const app = express();

let temperatureData = {};

app.use(bodyParser.json());

app.post('/data', (req, res) => {
    temperatureData = req.body;
    console.log('Received data:', temperatureData);
    res.sendStatus(200);
});

app.get('/data', (req, res) => {
    res.json(temperatureData);
});
 
app.use(express.static('public'));

const port = 8080;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
