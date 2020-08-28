import { Router, Request, Response } from 'express';
import {
  getToken,
  registerByInfo,
  getUserExistsByNameUsername,
  changePasswordByNameUsername,
} from '../resources/auth';
import {
  addExhibition,
  editExhibition,
  getExhibition,
} from '../resources/exhibition';
import {
  editPiece,
  addPiece,
  getPiece,
  connectPiecesToExhibition,
} from '../resources/piece';

const router = Router();

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
    const user = await getUserExistsByNameUsername(
      String(name),
      String(username),
    );
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

router.get('/exhibition', async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    const exhibition = await getExhibition(String(id));
    res.status(200).json(exhibition);
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

router.post('/exhibition/new', async (req, res) => {
  try {
    const { title, description, background, hashtag } = req.body;
    const exhibition = await addExhibition(
      title,
      description,
      background,
      hashtag,
    );
    res.status(200).json(exhibition);
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

router.post('/exhibition/edit', async (req, res) => {
  try {
    const { _id, title, description, background, hashtag } = req.body;
    const exhibition = await editExhibition(
      _id,
      title,
      description,
      background,
      hashtag,
    );
    res.status(200).json(exhibition);
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

router.get('/piece', async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    const piece = await getPiece(String(id));
    res.status(200).json(piece);
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

router.post('/piece/new', async (req, res) => {
  try {
    const { title, description, background, frame, image } = req.body;
    const piece = await addPiece(title, description, background, frame, image);
    res.status(200).json(piece);
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

router.post('/piece/edit', async (req, res) => {
  try {
    const { _id, title, description, background, frame, image } = req.body;
    const piece = await editPiece(
      _id,
      title,
      description,
      background,
      frame,
      image,
    );
    res.status(200).json(piece);
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

router.post('/piece/connect', async (req, res) => {
  try {
    const { exhibitionId, pieces } = req.body;
    const exhibition = await connectPiecesToExhibition(exhibitionId, pieces);
    res.status(200).json(exhibition);
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

export default router;
