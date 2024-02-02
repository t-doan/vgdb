/* eslint-disable @typescript-eslint/no-unused-vars -- Remove when used */
import 'dotenv/config';
import express from 'express';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import pg from 'pg';
import {
  ClientError,
  defaultMiddleware,
  errorMiddleware,
  authMiddleware,
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

const hashKey = process.env.TOKEN_SECRET;
if (!hashKey) throw new Error('TOKEN_SECRET not found in .env');

const app = express();

// Create paths for static directories
const reactStaticDir = new URL('../client/dist', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());

const targetUrl = 'https://api.rawg.io/api/games';
const key = '4a4f8ba8aaa144ff98854ca97003b2e2';

app.get('/api/games/:page', async (req, res, next) => {
  try {
    const pageNumber = +req.params.page;
    const response = await fetch(
      `${targetUrl}?key=${key}&page_size=20&page=${pageNumber}`
    );
    if (!response.ok) {
      next(new Error(response.status.toString()));
    } else {
      const result = await response.json();
      res.json(result);
    }
  } catch (e) {
    next(e);
  }
});

app.get('/api/details/:id', async (req, res, next) => {
  try {
    const gameId = +req.params.id;
    const response = await fetch(`${targetUrl}/${gameId}?key=${key}`);
    if (!response.ok) {
      next(new Error(response.status.toString()));
    } else {
      const result = await response.json();
      res.json(result);
    }
  } catch (e) {
    next(e);
  }
});

app.get('/api/search', async (req, res, next) => {
  try {
    const { query } = req.query;
    const response = await fetch(`${targetUrl}?key=${key}&search=${query}`);

    if (!response.ok) {
      next(new Error(response.status.toString()));
    } else {
      const result = await response.json();
      res.json(result.results);
    }
  } catch (e) {
    next(e);
  }
});

type User = {
  userId: number;
  username: string;
  password: string;
  profileImage: string;
  bio: string;
  createdAt: string;
  gamePlayed: number;
  currentPlay: string[];
};

app.post(`/api/auth/sign-up`, async (req, res, next) => {
  try {
    const { username, password, profileImage, bio, gamePlayed, currentPlay } =
      req.body as Partial<User>;
    if (!username || !password) {
      throw new ClientError(400, 'username and password are required fields');
    }
    const date = new Date();
    const dateCreated = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;
    const hashedPassword = await argon2.hash(password);
    const sql = `
    insert into "users"("username", "password", "createdAt", "profileImage", "bio", "gamePlayed", "currentPlay"
    )
    values ($1 , $2, $3, $4, $5, $6, $7)
    returning *;`;
    const params = [
      username,
      hashedPassword,
      dateCreated,
      profileImage,
      bio,
      gamePlayed,
      currentPlay,
    ];
    const result = await db.query<User>(sql, params);
    const [user] = result.rows;
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

type Auth = {
  username: string;
  password: string;
};
app.post('/api/auth/sign-in', async (req, res, next) => {
  try {
    const { username, password } = req.body as Partial<Auth>;
    if (!username || !password) {
      throw new ClientError(401, 'invalid login');
    }

    const sql = `
    select "userId", "password"
    from "users"
    where "username" = $1
    `;
    const params = [username];
    const result = await db.query<User>(sql, params);
    const [user] = result.rows;
    if (!user) {
      throw new ClientError(401, 'Invalid login');
    } else {
      const isPasswordValid = await argon2.verify(user.password, password);
      if (!isPasswordValid) {
        throw new ClientError(401, 'Invalid login');
      } else {
        const payload = {
          userId: user.userId,
          username,
        };
        const token = jwt.sign(payload, hashKey);
        res.status(200).json({
          token,
          user: payload,
        });
      }
    }
  } catch (err) {
    next(err);
  }
});

app.get('/api/user', authMiddleware, async (req, res, next) => {
  try {
    const sql = `select *
    from "users"
    where "userId" = $1`;
    const params = [req.user?.userId];
    const result = await db.query<User>(sql, params);

    const temp = result.rows[0];
    if (!temp) {
      throw new ClientError(404, 'Not found.');
    } else {
      res.status(201).json(result.rows[0]);
    }
  } catch (err) {
    next(err);
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
