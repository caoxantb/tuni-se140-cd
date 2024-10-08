const express = require("express");
const { execSync } = require("child_process");

const parseData = require("./utils.js");

const app = express();
const PORT = 8080;

app.get("/", (req, res) => {
  const serviceData = {
    // Get the IP address of the host machine
    ipAddress: execSync("hostname -I").toString().trim(),

    // Get the list of running processes and parse the output
    runningProcesses: parseData(execSync("ps -ax").toString().trim(), 4),

    // Get available disk space for the root directory and parse the output
    availableDiskSpace: parseData(execSync("df -h /").toString().trim()),

    // Get the time since the last system boot
    timeSinceLastBoot: execSync("uptime -p").toString().trim(),
  };

  res.json(serviceData);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
