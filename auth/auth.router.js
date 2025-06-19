import { Router } from 'express';
import { service, create, findAll, deleteOne, logIn } from './auth.controller.js';

export const router = Router();

router.get('/', service);
router.post('/user', create);
router.post('/logIn', logIn);
router.get('/users', findAll);
router.delete('/user/:id', deleteOne);