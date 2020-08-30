import { Router, Request, Response, NextFunction } from 'express';
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
import AuthController from '../controllers/auth';

const router = Router();

router.get('/', (_, res: Response) => {
  res.status(200).send('Server Application 🚀');
});

router.post('/auth/login', AuthController.login);

router.post('/auth/register', AuthController.register);

router.get('/auth/exists', AuthController.exists);

router.post('/auth/password', AuthController.changePassword);

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
      String(req.token),
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
      String(req.token),
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
    const piece = await addPiece(
      title,
      description,
      background,
      frame,
      image,
      String(req.token),
    );
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
      String(req.token),
    );
    res.status(200).json(piece);
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

router.post('/piece/connect', async (req, res) => {
  try {
    const { exhibitionId, pieces } = req.body;
    const exhibition = await connectPiecesToExhibition(
      exhibitionId,
      pieces,
      String(req.token),
    );
    res.status(200).json(exhibition);
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

export default router;
