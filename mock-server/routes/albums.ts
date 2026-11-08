import type { Request, Response } from 'express';
import express from 'express';

import { mocks } from '../db/index.ts';

export const router = express.Router();

router.get('/albums', (req: Request, res: Response) => {
  const q = String(req.query['q'] ?? '').toLowerCase();
  const albums = q
    ? mocks.albums.filter((album) => album.title.toLowerCase().includes(q))
    : mocks.albums;

  const start = Number(req.query['_start'] ?? 0);
  const limit = Number(req.query['_limit'] ?? albums.length);

  res.setHeader('X-Total-Count', albums.length.toString());

  res.json(albums.slice(start, start + limit));
});
