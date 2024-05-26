import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export const Rating_add = async (restaurantId:number,rating:number) =>
    {
    try {
        await prisma.$transaction([
        prisma.rating.create({
            data: { restaurantId, rating },
        }),
        ]);

        const ratings = await prisma.rating.findMany({
        where: { restaurantId },
        });
        
        let sum = 0;
        for (let i = 0; i < ratings.length; i++) {
        sum += Number(ratings[i].rating);
        }
        const averageRating = sum / ratings.length;
        await prisma.restaurant.update({
        where: { id: restaurantId },
        data: {
            averageRating,
        },
        });
    }
        catch(err:any){
            throw err.message
        }
};