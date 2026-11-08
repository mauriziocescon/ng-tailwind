import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import type { NextFunction, Request, Response } from 'express';

import { delay } from './middlewares/delay.ts';
import { error } from './middlewares/errors.ts';
import { router as albumsRouter } from './routes/albums.ts';
import { router as usersRouter } from './routes/users.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProduction = process.env.NODE_ENV === 'production';

const app = express();

// set the port of our application
// process.env.PORT lets the port to be set by Heroku
const port = process.env.PORT || 3000;

// CORS handling (replaces json-server defaults cors). The dev frontend runs
// cross-origin at http://localhost:3000 and reads X-Total-Count for albums
// pagination, so exposing that header is mandatory.
app.use((req: Request, res: Response, next: NextFunction): void => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');

  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
    return;
  }

  next();
});

// In production, serve the built Angular app and its SPA index.html fallback
// BEFORE the delay/error middlewares so built assets served at the root are
// never subject to the random delay/error injection (the `error` middleware
// only leaves paths under '/api/' alone).
if (isProduction) {
  app.use(express.static(path.join(__dirname, '../dist/ng-tailwind/browser')));

  app.get(/.*/, (req: Request, res: Response, next: NextFunction): void => {
    if (req.path.startsWith('/api/')) {
      next();
      return;
    }

    res.sendFile(path.join(__dirname, '../dist/ng-tailwind/browser/index.html'));
  });
}

// Middlewares (same order as before)
app.use(delay);
app.use(error);

// To handle POST, PUT and PATCH you need to use a body-parser
// (express 5 ships body-parser built in)
app.use(express.json());

const prefix = isProduction ? '/api' : '';

// Mount the per-resource routers. Each router defines its own paths (e.g.
// '/albums', '/users'), so they are mounted at the environment prefix: '/api'
// in production, the root in dev.
app.use(prefix, albumsRouter);
app.use(prefix, usersRouter);

// Start listening
app.listen(port, () => {
  console.log(`Mock server is running! Open the browser at http://localhost:${port}`);
});
