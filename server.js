const http = require("http");
const request = require("request");

const server = http.createServer((req, res) => {
  const targetUrl = req.headers['x-target-url']; // Get the target URL from the header

  if (!targetUrl) {
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.end("Missing 'X-Target-URL' header"); // Error if the header is missing
    return;
  }

  // Forward the request to the target URL
  request({ url: targetUrl, method: req.method, headers: req.headers })
    .on('error', (err) => {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end(`Load failed: ${err.message}`);
    })
    .pipe(res);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});