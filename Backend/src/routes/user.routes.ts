import { Router} from 'express';

import * as UserCtrl from '../controllers/user.controller';

const router = Router();

router.post('/create', UserCtrl.create);
router.post('/login', UserCtrl.login);
router.get('/islogged', UserCtrl.isLogged);
router.get('/logout', UserCtrl.logout);
router.get('/profile', UserCtrl.profileHandler);

export default router;