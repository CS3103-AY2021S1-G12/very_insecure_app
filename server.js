const express = require('express');
const serveStatic = require('serve-static');
const cookieParser = require('cookie-parser');

const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');

const pool = new Pool();
pool.query('SELECT 1;', (err, res) => {
    console.log({ err, res });
    pool.end();
});

const app = express();
const port = 3000;
const staticDir = './src/static';

const levelsRouter = require('./src/api/levelSystem');
app.use('/levels', levelsRouter);

const staticRouter = serveStatic(staticDir);
app.use('/levels', staticRouter);

app.use(cors());
app.use(cookieParser())

const authBypassRouter = require('./src/api/auth');
app.use(authBypassRouter);

const cookie = "eyJ1c2VybmFtZSI6Ikd1ZXN0IiwiaXNBZG1pbiI6ZmFsc2UsImlzQXV0aGVudGljYXRlZCI6dHJ1ZSwidG9rZW4iOiJqSmxFcHokV0c0M2sifQ==";
app.get('/auth-1/*', (req, res, next) => {
    res.cookie('session', cookie);
    next();
})
app.use('/assets', express.static(path.join(__dirname, 'src/assets')));
app.use('/auth-1', express.static(path.join(__dirname, 'src/auth-1')));
app.use('/auth-2', express.static(path.join(__dirname, 'src/auth-2')));


app.get('*', (req, res) => {
    res.status(404).send("Not found!");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
