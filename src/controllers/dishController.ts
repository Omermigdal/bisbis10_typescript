import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const addDish = async (req: Request, res: Response) => {
  const restaurantId= parseInt(req.params.id);
  const { name, description, price } = req.body;
  await prisma.dish.create({
    data: { name, description, price, restaurantId },
  });
  res.status(201).send();
};

export const updateDish = async (req: Request, res: Response) => {
  const { id, dishId } = req.params;
  const { name, description, price } = req.body;
  const updatedDish = await prisma.dish.update({
    where: { id: parseInt(dishId) },
    data: { name, description, price, restaurantId: parseInt(id) },
  });
  res.status(200).send();
};

export const deleteDish = async (req: Request, res: Response) => {
  const { dishId } = req.params;
  await prisma.dish.delete({ where: { id: parseInt(dishId) } });
  res.status(204).send();
};

export const getDishesByRestaurant = async (req: Request, res: Response) => {
  const { id } = req.params;
  const dishes = await prisma.dish.findMany({
    where: { restaurantId: parseInt(id) },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
    },
      
  });
  res.status(200).json(dishes);
};
