import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const makeOrder = async (req: Request, res: Response) => {
    const { restaurantId, orderItems } = req.body;
    
    if (!restaurantId) {
        return res.status(404).json({ error: 'Restaurant not found' });
    }
    
    const dishes = await prisma.dish.findMany({
        where: {
            id: {
                in: orderItems.map((item: { dishId: any }) => item.dishId),
            },
        },
    });
    /// check if this is ok
    
    const orderItemsData = orderItems.map((item: { dishId: any, quantity: number }) => {
        const dish = dishes.find((d) => d.id === item.dishId);
        if (!dish) {
            throw new Error(`Dish with id ${item.dishId} not found`);
        }
        return {
            dishId: item.dishId,
            quantity: item.quantity,
            price: Number(dish.price) * item.quantity, // calculate price for each order item
        };
    });
    
    const totalAmount = orderItemsData.reduce((acc: number, item: { price: number }) => acc + item.price, 0);
    
    const order = await prisma.order.create({
        data: {
            restaurantId,
            totalAmount,
            orderItems: {
                create: orderItemsData,
            },
        },
    });

    res.status(200).json(order.id); //TODO : check if i cn serialize

    
    
       

       

}
