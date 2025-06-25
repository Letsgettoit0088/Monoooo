const http = require("http");
const request = require("request");

const server = http.createServer((req, res) => {
  // Extract the target URL from the 'X-Target-URL' header
  const targetUrl = req.headers["x-target-url"];

  if (!targetUrl) {
    // If the header is missing, return a 400 Bad Request error
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        error: "Missing 'X-Target-URL' header",
        url: "https://github.com/Letsgettoit0088/Monoooo", // Include your GitHub repo URL here
      })
    );
    return;
  }

  // Forward the request to the target URL
  const options = {
    url: targetUrl,
    method: req.method,
    headers: req.headers,
  };

  request(options)
    .on("error", (err) => {
      // Handle errors when forwarding the request
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          error: `Unable to load the target URL (${err.message})`,
          url: "https://github.com/Letsgettoit0088/Monoooo", // Include your GitHub repo URL here
        })
      );
    })
    .pipe(res); // Pipe the response back to the client
});

// Use port 3000 or the one specified in the environment variables
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});