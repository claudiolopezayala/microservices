import { Router } from 'express';
import { service, create, findAll, deleteOne, logIn } from './auth.controller.js';
import { authentication } from './authentication.js';

export const router = Router();

router.get('/', service);
router.post('/user', authentication, create);
router.post('/logIn', logIn);
router.get('/users', authentication, findAll);
router.delete('/user/:id', authentication, deleteOne);