import type { Request, Response } from 'express';
import express from 'express';

import { mocks } from '../db/index.ts';

export const router = express.Router();

router.get('/users', (req: Request, res: Response) => {
  const q = String(req.query['q'] ?? '').toLowerCase();

  const users = q
    ? mocks.users.filter(
        (user) =>
          user.name.toLowerCase().includes(q) ||
          user.username.toLowerCase().includes(q) ||
          user.email.toLowerCase().includes(q),
      )
    : mocks.users;

  res.json(users);
});
