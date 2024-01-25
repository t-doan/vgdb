/* eslint-disable @typescript-eslint/no-unused-vars -- Remove when used */
import 'dotenv/config';
import express from 'express';
import pg from 'pg';
import {
  ClientError,
  defaultMiddleware,
  errorMiddleware,
} from './lib/index.js';

const connectionString =
  process.env.DATABASE_URL ||
  `postgresql://${process.env.RDS_USERNAME}:${process.env.RDS_PASSWORD}@${process.env.RDS_HOSTNAME}:${process.env.RDS_PORT}/${process.env.RDS_DB_NAME}`;
const db = new pg.Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();

// Create paths for static directories
const reactStaticDir = new URL('../client/dist', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());

app.get('/apiData/:page',  async (req, res, next) => {
  try{
    const pageNumber = +req.params.page;
    const response = await fetch(
      `https://api.rawg.io/api/games?key=4a4f8ba8aaa144ff98854ca97003b2e2&page_size=20&page=${pageNumber}`
    );
    if (!response.ok){
      next(Error);
    }
    else{
      const result = await response.json();
      res.json(result);
    }
  }
  catch(e){
    next(e);
  }
});

app.get('/apiData/:id', async (req, res, next) => {
  try {
    const gameId = +req.params.id;
    const response = await fetch(
      `https://api.rawg.io/api/games/${gameId}?key=4a4f8ba8aaa144ff98854ca97003b2e2`
    );
    if (!response.ok) {
      next(Error);
    } else {
      const result = await response.json();
      res.json(result);
    }
  } catch (e) {
    next(e);
  }
});


/*
 * Middleware that handles paths that aren't handled by static middleware
 * or API route handlers.
 * This must be the _last_ non-error middleware installed, after all the
 * get/post/put/etc. route handlers and just before errorMiddleware.
 */
app.use(defaultMiddleware(reactStaticDir));

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
