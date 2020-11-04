const express = require('express');
const serveStatic = require('serve-static');
const { Pool } = require('pg');

const pool = new Pool();
pool.query('SELECT 1;', (err, res) => {
    console.log({ err, res });
    pool.end();
});

const app = express();
const port = 3000;
const staticDir = './src/static';

const authBypassRouter = require('./src/api/auth');
app.use('/api', authBypassRouter);

const levelsRouter = require('./src/api/levelSystem');
app.use('/levels', levelsRouter);

const staticRouter = serveStatic(staticDir);
app.use('/levels', staticRouter);


app.get('*', (req, res) => {
    res.status(404).send("Not found!");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
