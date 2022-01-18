const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./app");

mongoose
  .connect("mongodb://localhost:27017/yasalam")
  .then(() => console.log("DB connection established"));

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
