import { Router } from 'express';
import { service, create, findAll, findOne, deleteOne } from './order.controller.js';

export const router = Router();

router.get('/', service);
router.post('/order', create);
router.get('/orders', findAll);
router.get('/order/:id', findOne);
router.delete('/order/:id', deleteOne);