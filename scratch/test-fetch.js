const fetch = require('node:browser' in globalThis ? 'fetch' : 'https').request;

const data = JSON.stringify({
  name: "Node Test User",
  email: "node-test@example.com",
  phone: "9876543210",
  location: "Gurgaon Sector 45",
  screentime: "clinically online",
  toxic_trait: "caffeine addiction",
  strongest_skill: "stalking internet trends",
  brand_culture: "Duolingo",
  dumb_startup: "Airbnb for houseplants",
  rabbit_holes: "deep ocean mysteries",
  culturally_cool: "mechanical keyboards",
  help_with: "vibes, memes",
  weekends: "yes",
  not_corporate: "this is pure chaos"
});

const url = 'https://script.google.com/macros/s/AKfycbzuOZ8XYZqXiYMJ-i4ghoBYVqyE17lWqgV4mbxjyJSmWqSXicX-DuFti5Efqyd-xMJaTw/exec';

console.log("Sending POST to Google Apps Script...");

const req = require('https').request(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'text/plain',
    'Content-Length': Buffer.byteLength(data)
  }
}, (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  console.log(`Headers:`, res.headers);
  
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    console.log('\nResponse Body:');
    console.log(body);
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

req.write(data);
req.end();
