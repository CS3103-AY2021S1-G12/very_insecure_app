import express from 'express';
import serveStatic  from 'serve-static';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import pg from 'pg';
import { fileURLToPath } from 'url';
const { Pool } = pg;

const pool = new Pool();
const maxAttempts = 10;
let dbError;
for (let attempts = 1; attempts <= maxAttempts; attempts++) {
    try {
        await pool.query('SELECT 1;');
        console.log('db connection ok');
        pool.end();
        dbError = null;
        break;
    } catch (err) {
        dbError = err;
        console.log(`failed to connect to db, retrying in ${1000 * attempts} ms`);
    }

    await new Promise(resolve => setTimeout(resolve, 1000 * attempts));
}

if (dbError) {
    console.warn({ dbError });
    process.exit(1);
}

const app = express();
const port = 3000;
const dirname = path.dirname(fileURLToPath(import.meta.url));
const staticDir = path.resolve(dirname, 'dist');
const index = path.resolve(staticDir, 'index.html');
app.use(cors());
app.use(cookieParser())

// const levelsRouter = require('./src/api/levelSystem');
// app.use('/levels', levelsRouter);
const cookie = "eyJ1c2VybmFtZSI6Ikd1ZXN0IiwiaXNBZG1pbiI6ZmFsc2UsImlzQXV0aGVudGljYXRlZCI6dHJ1ZSwidG9rZW4iOiJqSmxFcHokV0c0M2sifQ==";
app.get('*', (req, res, next) => {
    res.cookie('session', cookie, { httpOnly: true });
    next();
})

const staticRouter = serveStatic(staticDir);
app.use('/', staticRouter);

const { default: authBypassRouter } = await import('./src/api/auth.js');
app.use(authBypassRouter);


// app.use('/assets', express.static(path.join(__dirname, 'src/assets')));
// app.use('/auth-1', express.static(path.join(__dirname, 'src/static/auth-1')));
// app.use('/auth-2', express.static(path.join(__dirname, 'src/static/auth-2')));
// app.use('/auth-3', express.static(path.join(__dirname, 'src/static/auth-3')));

app.get('*', (req, res) => {
    res.sendFile(index);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
