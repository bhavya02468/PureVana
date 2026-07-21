const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;
const rootDir = __dirname;

app.use("/assets", express.static(path.join(rootDir, "assets")));
app.use(express.static(rootDir, { extensions: ["html"] }));

app.get("/", (_req, res) => {
  res.sendFile(path.join(rootDir, "index.html"));
});

app.listen(port, () => {
  console.log(`Purevana website running on port ${port}`);
});
