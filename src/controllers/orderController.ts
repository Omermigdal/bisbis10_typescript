import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const makeOrder = async (req: Request, res: Response) => {
    const { restaurantId, orderItems } = req.body;
    
    if (!restaurantId) {
        return res.status(400).json({ error: 'Restaurant not found' });
    }
    const restaurant = await prisma.restaurant.findUnique({where: {id:restaurantId}})
    
    const dishes = await prisma.dish.findMany({
        where: {
            id: {
                in: orderItems.map((item: { dishId: any }) => item.dishId),
            },
        },
    });
   
    
    
    const order = await prisma.order.create({
        data: {
            restaurantId,
            orderItems: {
                createMany: {data: orderItems,},
            },
        },
    });

    res.status(200).json(order.id); //TODO : check if i cn serialize
}
