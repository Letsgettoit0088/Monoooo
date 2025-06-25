export default async function handler(req, res) {
  const targetUrl = req.headers["x-target-url"];

  if (!targetUrl) {
    res.status(400).json({
      error: "Missing 'X-Target-URL' header",
      url: "https://github.com/Letsgettoit0088/Monoooo",
    });
    return;
  }

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: req.headers,
    });

    const body = await response.text();

    res.status(response.status);
    res.setHeader("Content-Type", response.headers.get("content-type") || "text/plain");
    res.send(body);
  } catch (err) {
    res.status(500).json({
      error: `Unable to load the target URL (${err.message})`,
      url: "https://github.com/Letsgettoit0088/Monoooo",
    });
  }
}