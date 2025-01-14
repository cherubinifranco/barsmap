import express from 'express';
import jwt from"jsonwebtoken"
import { db, addBar } from "../db/database.js";
import bcrypt from "bcrypt";

const loginRouter = express.Router();


loginRouter.post("/", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(req.body)
  try {
    const user = await getUserByUsername(username);
    if (await bcrypt.compare(password, user.password_hash)) {
      // Handle Login success
      const token = jwt.sign(user, process.env.SERVER_SALT, {
        expiresIn: "1h",
      });
      res.status(202).cookie("token", token).send("Success");
    } else {
      // Handle Login Failed
      res.status(403).send("Not Allowed");
    }
  } catch {
    res.status(500).send("Server Error");
  }
});

function getUserByUsername(username, password) {
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

export default loginRouter;
