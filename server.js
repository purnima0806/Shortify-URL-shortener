const express = require("express");
const { nanoid } = require("nanoid");

const app = express();
app.use(express.json());
app.use(express.static("public"));

const urlDB = {};   // stores shortCode : longURL

// Create short URL
app.post("/shorten", (req, res) => {
  const longUrl = req.body.longUrl;

  if (!longUrl) {
    return res.status(400).json({ error: "URL is required" });
  }

  const shortCode = nanoid(6);
  urlDB[shortCode] = longUrl;

  res.json({
    shortUrl: `http://localhost:3000/${shortCode}`
  });
});

// Redirect to original URL
app.get("/:code", (req, res) => {
  const longUrl = urlDB[req.params.code];

  if (!longUrl) {
    return res.status(404).send("URL not found");
  }

  res.redirect(longUrl);
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
