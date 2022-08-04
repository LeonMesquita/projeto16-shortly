import {Router} from   'express';
const router = Router();
import {validateUser} from '../middlewares/validateUser.js'
import {getUserData} from '../controllers/userController.js';

router.get('/users/me',validateUser, getUserData);

export default router;