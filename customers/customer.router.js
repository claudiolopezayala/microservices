import { Router } from 'express';
import { service, create, findAll, findOne, deleteOne } from './customer.controller.js';

export const router = Router();

router.get('/', service);
router.post('/customer', create);
router.get('/customers', findAll);
router.get('/customer/:id', findOne);
router.delete('/customer/:id', deleteOne);