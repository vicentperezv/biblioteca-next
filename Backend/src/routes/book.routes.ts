import { Router } from "express";

import multer from "multer";
import path from 'path';

import * as BookCtrl from "../controllers/book.controller";
import * as auth from "../auth/auth.middleware";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './assets/cover')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }
  })
  
const multerMiddleware = multer({ storage: storage });
const router = Router();

router.post('/save', auth.verifyToken, BookCtrl.saveBook)
router.get('/byid/:id?', BookCtrl.getBookById);
router.get('/byname/:name?', BookCtrl.getBookByName);
router.get('/all', BookCtrl.getBooks);
router.get('/available', BookCtrl.availableBooks);
router.get('/myBooks', auth.verifyToken, auth.email, BookCtrl.myBooks)
router.post('/uploadCover/:id',multerMiddleware.array('image'), BookCtrl.uploadCover);
router.get ('/get-cover/:image', BookCtrl.getCover);
router.get('/takeBack/:id', auth.verifyToken, auth.email, BookCtrl.takeBack);
router.get('/takeABook/:id',auth.verifyToken, auth.email, BookCtrl.takeABook);

export default router;
