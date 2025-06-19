import { Router } from 'express';
import { service, create, findAll, findOne, deleteOne } from './book.controller.js';

export const router = Router();

router.get('/', service);
router.post('/book', create);
router.get('/books', findAll);
router.get('/book/:id', findOne);
router.delete('/book/:id', deleteOne);