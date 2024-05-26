import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const Order_create = async (restaurantId:number,orderItems:any) =>
    {
      try{
        const order = await prisma.order.create({
            data: {
                restaurantId,
                orderItems: {
                    createMany: {data: orderItems,},
                },
            },
        });
        return order;
    }
    catch(err:any){
        throw err.message
    }
};