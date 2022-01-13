const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./app");

mongoose
  .connect(
    "mongodb+srv://dbYasalam:Xp9iuzszFA56iSJG@cluster0.r2c1j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  )
  .then(() => console.log("DB connection established"));

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
