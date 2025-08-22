import express from "express";
import "dotenv/config" // oneliner for configuration
import { env } from "process";



const app = express();
const port: number = Number(process.env.PORT) || 3000
const secret = process.env.MY_GLOBAL_TEST_SECRET;

app.get("/", (req, res) => {
  res.status(200).send("hello world!");
});

//Start Server On Port Variable
app.listen(port, "0.0.0.0", () => {
  console.log("Listening on port " + port);
});
