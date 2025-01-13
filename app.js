import express from 'express';
import usersRouter from "./routes/users.js"
import barsRouter from './routes/bars.js';
import { db, dropTables, createTables } from './db/database.js';

function createServer() {
    const app = express();


    createTables()

    app.use(express.json());

    app.use("/bars", barsRouter)
    app.use("/users", usersRouter)

    app.get("/", (req, res) => {
        res.status(200).send("Hello World");
    });

    return app;
}

export default createServer;