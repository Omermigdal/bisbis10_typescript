import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const addRating = async (req: Request, res: Response) => {
  const { restaurantId, rating } = req.body;

  // Validate inputs
  if (restaurantId === undefined || rating === undefined || rating < 0 || rating > 5) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  try {
    // Start a transaction
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
    
    const updatedRestaurant = await prisma.restaurant.findUnique({
      where: { id: restaurantId },
      include: { ratings: true },
    });
    
    res.status(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
};