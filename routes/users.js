import express from "express";
import { db, addBar } from "../db/database.js";
import bcrypt from "bcrypt";

const usersRouter = express.Router();

usersRouter.get("/", (req, res) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

usersRouter.post("/", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    await addUser(username, hashedPassword);
    res.status(201).send();
  } catch {
    res.status(500).send();
  }
});

usersRouter.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const user = await getUser(username, password);
    if (await bcrypt.compare(password, user.password_hash)) {
      res.send("Success");
    } else {
      res.send("Not Allowed");
    }
  } catch {
    res.status(500).send("Server Error");
  }
});

function addUser(username, password) {
  return new Promise((resolve, reject) => {
    db.run(
      `
        INSERT INTO users (username, password_hash) VALUES (?, ?)
    `,
      username,
      password,
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
}

function getUser(username, password) {
  return new Promise((resolve, reject) => {
    db.all(
      `
            SELECT * FROM users WHERE username == (?) LIMIT 1
        `,
      username,
      (err, user) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(user[0]);
        }
      }
    );
  });
}

export default usersRouter;
