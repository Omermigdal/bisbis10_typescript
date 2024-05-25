import { Router } from 'express';
import {makeOrder} from '../controllers/orderController';

const orderRouter = Router();

orderRouter.post('/', makeOrder);

export default orderRouter;
