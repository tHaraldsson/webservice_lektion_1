import express, { type Request, type Response } from "express";
import "dotenv/config"; // oneliner for configuration
import { validateSecret } from "./security/validateEnv.js";
import { closeDB, runDB, getDB } from "./db/database.js";
import type { Db } from "mongodb";

const app = express();
const port: number = Number(process.env.PORT) || 3000;
const secret = validateSecret(process.env.MY_GLOBAL_TEST_SECRET);

interface User {
  id: number;
  name: string;
}

const user: User = { id: 1, name: "tobbe" };

app.get("/user", (req, res) => {
  res.status(201).send(user);
});

app.get("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  res.send({ message: `id = ${id}` });
});

app.get("/api/v1/database/comments/:username", async (req, res) => {
  const db: Db = getDB();
  const result = await db
    .collection("comments")
    .find({ name: req.params.username }) // Mercedes Tyler
    .limit(25)
    .toArray();

  if (result.length === 0) {
    res.status(404).send({ message: "Nothing was found" });
    return;
  }
  res.send(result);
});

async function startServer() {
  try {
    await runDB();

    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
      console.log(`Start the app: http://localhost:${port}`);
    });

    process.on("SIGINT", async () => {
      console.log("Cleaning up...");
      await closeDB();
      process.exit(0);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
}

startServer();
