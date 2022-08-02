import {Router} from   'express';
const router = Router();
import { registerUser, loginUser } from '../controllers/authController.js';

router.post('/signup', registerUser);
router.post('/signin', loginUser);
export default router;