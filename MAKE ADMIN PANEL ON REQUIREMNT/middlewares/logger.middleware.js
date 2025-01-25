const fs = require('fs');
const path = require('path');

const logger = (req, res, next) => {
  const timestamp = new Date().toString();
  const logMessage = `URL: ${req.url}, Method: ${req.method}, Timestamp: ${timestamp}\n`;
  console.log(logMessage);

  const logFilePath = path.join(__dirname, 'log.txt');

  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error('Failed to write to log file:', err);
    }
  });

  next();
};

module.exports = {
  logger,
};
