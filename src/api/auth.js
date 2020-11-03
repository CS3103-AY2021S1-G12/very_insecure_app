const express = require('express');
const cookieParser = require('cookie-parser');

// DB connections
const { Pool } = require('pg');
const pool = new Pool();

// Middleware for routers
const router = express.Router();
router.use(cookieParser());
router.use(express.json());


const LEVEL_1_PROMO_CODE = "`2MH}\?TV<@4M;T{&CD?3'YH";



// Level 1 endpoint
router.get('/admin/promo', (req, res) => {
  const cookie = req.cookies['session'];

  if (!cookie) {
    res.status(401).send("Not authorized!");
    return;
  }

  const buff = Buffer.from(cookie, 'base64');
  console.log(buff.toString('ascii'));
  const token = JSON.parse(buff.toString('ascii'));

  if (token.isAdmin) {
    res.status(200).send(LEVEL_1_PROMO_CODE);
  } else {
    res.status(401).send("Not authorized!");
  }
});


// Level 2 endpoint
router.post('/login', (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).send("Bad request!");
    return;
  }

  const { username, password } = req.body;

  query = `SELECT id, username FROM users WHERE username = '${username}' AND pw = '${password}'`;
  
  pool.query(query)
    .then(({rows}) => {
      if (rows.length === 0) {
        res.status(400).send("Invalid credentials!");
      }
      
      res.status(200).send(rows[0]);
    })
    .catch(e => {
       res.status(500).send(`Server error: ${e.message}`);
    })
});

module.exports = router;