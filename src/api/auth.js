const express = require('express');

// DB connections
const { Pool } = require('pg');
const pool = new Pool();

// Middleware for routers
const router = express.Router();
router.use(express.json());


const LEVEL_1_PROMO_CODE = "`2MH}\?TV<@4M;T{&CD?3'YH";

// Level 1 endpoint
// Simple GET endpoint that returns a promo code if user is authenticated
// based on a flag in the base-64 encoded cookie
router.get('/admin/promo', (req, res) => {
  const cookie = req.cookies['session'];
  if (!cookie) {
    res.status(401).send("Not authorized!");
    return;
  }

  const buff = Buffer.from(cookie, 'base64');
  const token = JSON.parse(buff.toString('ascii'));

  if (token.isAdmin) {
    res.status(200).send(LEVEL_1_PROMO_CODE);
  } else {
    res.status(401).send("Not authorized!");
  }
});

// Level 1 promo code verification endpoint
router.post('/admin/promo', (req, res) => {
  if (!req.body.code) {
    res.status(400).send("Bad request!");
    return;
  }

  console.log(req.body);

  const { code } = req.body;
  if (code === LEVEL_1_PROMO_CODE) {
    // For actual one maybe send a token/cookie for the next level?
    res.status(200).send("OK!");
  } else {
    res.status(400).send("Bad request!");
  }
});


// Level 2 endpoint
// Simple login endpoint that returns user info as a JSON object
router.post('/login', (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).send("Bad request!");
    return;
  }

  const { username, password } = req.body;

  query = `SELECT id, username FROM users WHERE username = '${username}' AND pw = '${password}'`;

  pool.query(query)
    .then(({ rows }) => {
      if (rows.length === 0) {
        res.status(400).send("Invalid credentials!");
      }

      res.status(200).send(rows[0]);
    })
    .catch(e => {
      res.status(500).send(`Server error: ${e.message}`);
    })
});

// Level 3 endpoint
// Simple GET endpoint that returns product listings with filtering based on
// the query parameter 'name'.
router.get('/products', (req, res) => {
  const filter = req.query.name;

  let query;
  if (!filter) {
    query = "SELECT * FROM products;"
  } else {
    query = `SELECT * FROM products WHERE item_name ILIKE '%${filter}%';`;
  }

  pool.query(query)
    .then(({ rows }) => {
      const data = rows.map(x => {
        // Only return first 3 columns of query result
        const truncated = {};
        truncated[Object.keys(x)[0]] = x[Object.keys(x)[0]];
        truncated[Object.keys(x)[1]] = x[Object.keys(x)[1]];
        truncated[Object.keys(x)[2]] = x[Object.keys(x)[2]];
        return truncated;
      });

      res.status(200).send(data);
    })
    .catch(e => {
      res.status(500).send(`Server error: ${e.message}`);
    })
});

module.exports = router;