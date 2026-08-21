const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;
const rootDir = __dirname;

app.use(express.json());

app.post("/api/inquiries", async (req, res) => {
  try {
    const apiResponse = await fetch("https://purevanaserver.netlify.app/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });
    const responseBody = await apiResponse.text();
    const contentType = apiResponse.headers.get("content-type");

    if (contentType) res.type(contentType);
    res.status(apiResponse.status).send(responseBody);
  } catch (_error) {
    res.status(502).json({ error: "Unable to reach the inquiries service." });
  }
});

app.use("/assets", express.static(path.join(rootDir, "assets")));
app.use(express.static(rootDir, { extensions: ["html"] }));

app.get("/", (_req, res) => {
  res.sendFile(path.join(rootDir, "index.html"));
});

app.listen(port, () => {
  console.log(`Purevana website running on port ${port}`);
});
