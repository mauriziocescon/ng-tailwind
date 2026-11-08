import express from 'express';
import type { Request, Response } from 'express';

import { mocks } from '../db/index.ts';

export const router = express.Router();

// GET /users: text filter on name, username and email. No pagination.
router.get('/users', (req: Request, res: Response): void => {
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
