const express = require("express");
const env = require("dotenv");
env.config();

const router = require("./routes/index.js");

const app = express();
const PORT = process.env.APP_PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Listening to Port : ${PORT}`);
});
