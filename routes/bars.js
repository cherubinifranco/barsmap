import express from 'express';
import { db, addBar } from '../db/database.js';
import cookieJwtAuth from '../middleware/cookieJswtAuth.js';

const barsRouter = express.Router();

barsRouter.get('/', (req, res) => {
    db.all('SELECT * FROM bars', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

// barsRouter.post("/", coockieJwtAuth, async (req, res) => {
barsRouter.post("/", async (req, res) => {
    const name = req.body.name
    const location = req.body.location
    const image = req.body.image
    await addBar(name, location, image);
    res.send({"message": "success"})

})
export default barsRouter;