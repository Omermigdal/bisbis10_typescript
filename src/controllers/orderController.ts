import { Request, Response } from 'express';
import { Order_create } from '../services/orderService';

export const makeOrder = async (req: Request, res: Response) => {
    try{
    const { restaurantId, orderItems } = req.body;
    const newOrder= await Order_create(restaurantId,orderItems);
    res.status(200).json(newOrder.id); 
    }
    catch(errorMessage)
    {
      return errorMessage;
    }
}
