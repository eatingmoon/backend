import { Router, Response } from 'express';

import AuthController from '../controllers/auth';
import ExhibitionController from '../controllers/exhibition';
import PieceController from '../controllers/piece';

const router = Router();

router.get('/', (_, res: Response) => {
  res.status(200).send('Server Application 🚀');
});

router.post('/auth/login', AuthController.login);

router.post('/auth/register', AuthController.register);

router.get('/auth/exists', AuthController.exists);

router.post('/auth/password', AuthController.changePassword);

router.get('/exhibition', ExhibitionController.getOneExhibition);

router.post('/exhibition/new', ExhibitionController.newExhibition);

router.post('/exhibition/edit', ExhibitionController.editExhibition);

router.get('/piece', PieceController.getOnePiece);

router.post('/piece/new', PieceController.newPiece);

router.post('/piece/edit', PieceController.editPiece);

router.post('/piece/connect', PieceController.connectPiecesToExhibition);

export default router;
