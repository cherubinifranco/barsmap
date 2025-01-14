import express from "express";
import cookieparser from "cookie-parser";
import usersRouter from "./routes/users.js";
import barsRouter from "./routes/bars.js";
import loginRouter from "./routes/login.js";
import { db, dropTables, createTables } from "./db/database.js";
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:3001",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

function createServer() {
  const app = express();
  createTables();

  app.use(cors(corsOptions)); // Use this after the variable declaration
  app.use(cookieparser());
  app.use(express.json());

  app.use("/login", loginRouter);
  app.use("/bars", barsRouter);
  app.use("/users", usersRouter);

  app.get("/", (req, res) => {
    res.status(200).send("Hello World");
  });

  return app;
}

export default createServer;
