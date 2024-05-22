import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllRestaurants = async (req: Request, res: Response) => {
  const restaurants = await prisma.restaurant.findMany();
  res.json(restaurants);
};

export const getRestaurantById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const restaurant = await prisma.restaurant.findUnique({
    where: { id: parseInt(id) },
    include: { dishes: true },
  });
  res.json(restaurant);
};

export const addRestaurant = async (req: Request, res: Response) => {
  const { name, isKosher, cuisines } = req.body;
  const newRestaurant = await prisma.restaurant.create({
    data: { name, isKosher, cuisines },
  });
  res.status(201).json(newRestaurant);
};

export const updateRestaurant = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, isKosher, cuisines } = req.body;
  const updatedRestaurant = await prisma.restaurant.update({
    where: { id: parseInt(id) },
    data: { name, isKosher, cuisines },
  });
  res.json(updatedRestaurant);
};

export const deleteRestaurant = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.restaurant.delete({ where: { id: parseInt(id) } });
  res.status(204).send();
};
