const express = require("express");
const { SerialPort } = require("serialport");
const app = express();
const port = 5000;

const cors = require("cors");
app.use(cors());

// arduino communication path
const arduinoPath = "COM5";
const arduinoPort = new SerialPort({ path: arduinoPath, baudRate: 9600 }); // baudrate same as on arduino

// parsing json
app.use(express.json());

app.post("/led/brightness/:percent", (req, res) => {
  const brightness = parseInt(req.params.percent);

  if (isNaN(brightness) || brightness < 0 || brightness > 100) {
    return res.status(400).send("Brightness must be between 0 and 100");
  }

  arduinoPort.write(`${brightness}\n`, (err) => {
    if (err) {
      return res.status(500).send("Error sending brightness to Arduino");
    }
    res.send(`LED brightness set to ${brightness}%`);
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
