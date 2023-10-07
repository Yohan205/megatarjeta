/**
 * For use it like a https server discomment next line and config it through the .pem files
 */
// const https = require('https');
const http = require('http');
// Use file sistem
const fs = require('fs');

// Usen express server
const app = require("./src/express");

http.Server(app).listen(2023, () => {
    console.log('Server in port' , app.get('port'));
  })