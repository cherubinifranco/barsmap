import sqlite3 from "sqlite3";
const db = new sqlite3.Database("./db/barmap.db", (err) => {
  if (err) {
    console.log("Error connecting to the database", err);
  } else {
    console.log("Connected to the database");
  }

  db.run('PRAGMA foreign_keys = ON;', (err) => {
    if (err) {
        console.error('Error enabling foreign keys:', err);
    } else {
        console.log('Foreign keys enabled.');
    }
});

});

function dropTables() {
  db.exec(`
        DROP TABLE IF EXISTS bars;

    `);
}

function createTables() {
  db.exec(`
        CREATE TABLE IF NOT EXISTS bars(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        location TEXT NOT NULL,
        image TEXT);

        CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL );

        CREATE TABLE IF NOT EXISTS userbars (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER REFERENCES users(id),
        bar_id INTEGER REFERENCES bars(id)
        );
    `);
}

function addBar(name, location, image) {
  return new Promise((resolve, reject) => {
    db.run(
      `
      INSERT INTO bars (name, location) VALUES (?, ?)
  `,
      name,
      location,
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

export { db, dropTables, createTables, addBar };
