import express from 'express';
import type { Request, Response } from 'express';

import { mocks } from '../db/index.ts';

export const router = express.Router();

// GET /albums: text filter on title, then X-Total-Count (filtered total) and
// a _start/_limit slice for pagination. The client always sends well-formed
// values, so parse the numeric params inline.
router.get('/albums', (req: Request, res: Response): void => {
  const q = String(req.query['q'] ?? '').toLowerCase();
  const albums = q ? mocks.albums.filter((album) => album.title.toLowerCase().includes(q)) : mocks.albums;

  res.setHeader('X-Total-Count', albums.length.toString());

  const start = Number(req.query['_start'] ?? 0);
  const limit = Number(req.query['_limit'] ?? albums.length);

  res.json(albums.slice(start, start + limit));
});
