const http = require('http');
const fs = require('fs');
const path = require('path');
const open = require('child_process').exec;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

const server = http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0];
  if (urlPath === '/') urlPath = '/index.html';
  
  const filePath = path.join(__dirname, urlPath);
  const ext = path.extname(filePath).toLowerCase();
  const mime = MIME_TYPES[ext] || 'application/octet-stream';
  
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not Found: ' + filePath);
      return;
    }
    res.writeHead(200, { 'Content-Type': mime });
    res.end(data);
  });
});

const PORT = 8000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  try {
    open(`start http://localhost:${PORT}`);
  } catch(e) {}
});
