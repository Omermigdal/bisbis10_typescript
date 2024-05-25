import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { Rating_add } from '../services/ratingService';


export const addRating = async (req: Request, res: Response) => {
  const { restaurantId, rating } = req.body;
  try{
    await Rating_add(restaurantId,rating);
    res.status(200).send();
  }
  catch(errorMessage)
    {
      return errorMessage;
    }
  
};