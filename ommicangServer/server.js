const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const db = new sqlite3.Database(':memory:');
db.serialize(() => {
  db.run('CREATE TABLE users (name TEXT, telegramId TEXT)');
});

app.post('/register', (req, res) => {
  const { name, telegramId } = req.body;
  const stmt = db.prepare('INSERT INTO users (name, telegramId) VALUES (?, ?)');
  stmt.run(name, telegramId, function(err) {
    if (err) {
      res.status(500).send({ message: 'Database error' });
    } else {
      res.status(200).send({ message: 'User registered successfully' });
    }
  });
  stmt.finalize();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});



// const express = require('express');
// const sqlite3 = require('sqlite3').verbose();

// const app = express();
// const port = process.env.PORT || 3000;

// // Middleware to parse JSON
// app.use(express.json());

// // Create or connect to the database
// const db = new sqlite3.Database('./users.db', (err) => {
//     if (err) {
//         console.error(err.message);
//     } else {
//         console.log('Connected to the SQLite database.');
//     }
// });

// // Create users table if it doesn't exist
// db.run(`CREATE TABLE IF NOT EXISTS users (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name TEXT NOT NULL,
//     telegramId TEXT NOT NULL
// )`);

// // Endpoint to store user data
// app.post('/signup', (req, res) => {
//     const { name, telegramId } = req.body;

//     if (!name || !telegramId) {
//         return res.status(400).send('Name and Telegram ID are required');
//     }

//     db.run(`INSERT INTO users (name, telegramId) VALUES (?, ?)`, [name, telegramId], function(err) {
//         if (err) {
//             return res.status(500).send(err.message);
//         }
//         res.status(200).send('User registered successfully');
//     });
// });

// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });
