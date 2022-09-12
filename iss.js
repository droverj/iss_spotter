// iss.js
const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org/?format=json', (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};


const fetchCoordsByIP = function(ip, callback) {
  request('http://ipwho.is/' + ip, (error, _, body) => {
    if (error) return callback(error, null);

    const data = JSON.parse(body);

    if (!data.success) {
      const message = `Success status was: ${data.success}. Server message says: ${data.message} when fetching for IP ${data.ip}`;
      callback(Error(message), null);
      return;
    }

    const coords = {};
    coords["latitude"] = data.latitude;
    coords["longitude"] = data.longitude;
    return callback(null, coords);
  })
};


module.exports = { 
  fetchMyIP,
  fetchCoordsByIP 
};