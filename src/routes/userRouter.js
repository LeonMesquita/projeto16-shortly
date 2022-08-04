import {Router} from   'express';
const router = Router();
import {validateUser} from '../middlewares/validateUser.js'
import {getUserData, getRanking} from '../controllers/userController.js';

router.get('/users/me',validateUser, getUserData);
router.get('/ranking', getRanking);

export default router;