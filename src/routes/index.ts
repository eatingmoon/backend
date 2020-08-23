import { Router, Request, Response } from 'express';
import {
  getToken,
  registerByInfo,
  getUserExistsByNameUsername,
  changePasswordByNameUsername,
} from '../resources/auth';

const router = Router();

// Use imported routes

router.get('/', (_, res: Response) => {
  res.status(200).send('Server Application 🚀');
});

router.post('/auth/login', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await getToken(username, password);
    res.status(200).json(user);
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

router.post('/auth/register', async (req: Request, res: Response) => {
  try {
    const { username, password, name, birth, gender } = req.body;
    const user = await registerByInfo(username, password, name, birth, gender);
    res.status(200).json(user);
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

router.get('/auth/exists', async (req: Request, res: Response) => {
  try {
    const { name, username } = req.query;
    const user = await getUserExistsByNameUsername(name, username);
    res.status(200).json(user);
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

router.post('/auth/password', async (req: Request, res: Response) => {
  try {
    const { name, username, password } = req.body;
    const user = await changePasswordByNameUsername(name, username, password);
    res.status(200).json(user);
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

export default router;
