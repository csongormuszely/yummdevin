const https = require('https');

const url = 'https://chat-history-app-7oowhzix.devinapps.com';
const interval = 30000; // 30 seconds

function pingServer() {
  https.get(url, (resp) => {
    console.log(`[${new Date().toISOString()}] Keep-alive ping successful`);
  }).on('error', (err) => {
    console.log(`[${new Date().toISOString()}] Keep-alive ping failed:`, err.message);
  });
}

// Initial ping
pingServer();

// Schedule regular pings
setInterval(pingServer, interval);

console.log('Keep-alive service started...');
