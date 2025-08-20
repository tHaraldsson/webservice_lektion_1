import express from "express";
import "dotenv/config" // oneliner for configuration



const app = express();
const port: number = 3000;
const secret = process.env.MY_GLOBAL_TEST_SECRET;

app.get("/", (req, res) => {
  res.status(200).send("hello world!");
});

//Start Server On Port Variable
app.listen(port, () => {
  console.log("Listening on port " + port);
  console.log(secret);
});
