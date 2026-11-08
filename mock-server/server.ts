import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import type { NextFunction, Request, Response } from 'express';

import { mocks } from './db/index.ts';
import type { Mocks } from './db/index.ts';
import { delay } from './middlewares/delay.ts';
import { error } from './middlewares/errors.ts';

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

// Minimal request logger (mirrors json-server morgan-style defaults)
app.use((req: Request, res: Response, next: NextFunction): void => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Middlewares (same order as before)
app.use(delay);
app.use(error);

// To handle POST, PUT and PATCH you need to use a body-parser
// (express 5 ships body-parser built in)
app.use(express.json());

// In production, serve the built Angular app
if (isProduction) {
  app.use(express.static(path.join(__dirname, '../dist/ng-tailwind/browser')));
}

// Deeply checks whether any nested string/number value of an item contains
// the lowercased query substring (case-insensitive), matching json-server's
// full-text `q` filtering fidelity.
const matchesQuery = (value: unknown, query: string): boolean => {
  if (typeof value === 'string') {
    return value.toLowerCase().includes(query);
  }

  if (typeof value === 'number') {
    return value.toString().toLowerCase().includes(query);
  }

  if (Array.isArray(value)) {
    return value.some((item) => matchesQuery(item, query));
  }

  if (value !== null && typeof value === 'object') {
    return Object.values(value).some((item) => matchesQuery(item, query));
  }

  return false;
};

const parseInteger = (value: unknown, fallback: number): number => {
  if (typeof value !== 'string') {
    return fallback;
  }

  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? fallback : parsed;
};

// Generic resource router over the in-memory `mocks` object
const router = express.Router();

router.get('/:resource', (req: Request, res: Response): void => {
  const resource = req.params.resource as keyof Mocks;
  const collection = Object.prototype.hasOwnProperty.call(mocks, resource) ? mocks[resource] : undefined;

  if (!collection) {
    res.sendStatus(404);
    return;
  }

  let items: readonly Record<string, unknown>[] = collection as readonly unknown[] as readonly Record<string, unknown>[];

  // Full-text `q` filtering
  const q = req.query['q'];
  if (typeof q === 'string' && q.length > 0) {
    const query = q.toLowerCase();
    items = items.filter((item) => matchesQuery(item, query));
  }

  // X-Total-Count reflects the FILTERED count, before slicing
  res.setHeader('X-Total-Count', items.length.toString());

  // `_start` / `_limit` offset slicing
  const hasStart = typeof req.query['_start'] === 'string';
  const hasLimit = typeof req.query['_limit'] === 'string';

  if (hasStart || hasLimit) {
    const start = parseInteger(req.query['_start'], 0);
    if (hasLimit) {
      const limit = parseInteger(req.query['_limit'], 0);
      items = items.slice(start, start + limit);
    } else {
      items = items.slice(start);
    }
  }

  res.json(items);
});

// Mount routes
app.use(`${isProduction ? '/api' : '/'}`, router);

// Fallback on frontend routes (Express 5 rejects the bare '*' path string,
// so use a trailing app.use handler). In production load index.html and let
// the frontend handle page changes; otherwise continue.
app.use((req: Request, res: Response, next: NextFunction): void => {
  if (isProduction && req.method === 'GET') {
    res.sendFile(path.join(__dirname, '../dist/ng-tailwind/browser/index.html'));
    return;
  }

  next();
});

// Start listening
app.listen(port, () => {
  console.log(`Mock server is running! Open the browser at http://localhost:${port}`);
});
