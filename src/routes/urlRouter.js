import {Router} from   'express';
const router = Router();
import {shortenUrl, getUrlById, openShortUrl, deleteUrl} from '../controllers/urlController.js';
import {validateUrl} from '../middlewares/validateUrl.js';
import {validateUser} from '../middlewares/validateUser.js';


router.post('/urls/shorten',validateUser, validateUrl, shortenUrl);
router.get('/urls/:id', getUrlById);
router.get('/urls/open/:shortUrl', openShortUrl);
router.delete('/urls/:id',validateUser, deleteUrl);
export default router;
