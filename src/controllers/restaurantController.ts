import { Request, Response } from 'express';
import { getAll,getByCuisine,getById,addToSystem,update,deleteById } from '../services/restaurantService';

export const getRestaurants = async (req: Request, res: Response) => {
if (req.query.cuisine) {
    try{
    const cuisine = req.query.cuisine as string;
    const restaurants = await getByCuisine(cuisine);
    res.status(200).json(restaurants);
    }
    catch(errorMessage)
    {
      res.status(500).send(errorMessage);
    }
  }
  else {
    try{
    const restaurants =await getAll();
    res.status(200).json(restaurants).send();
    }
    catch(errorMessage)
    {
      res.status(500).send(errorMessage);
    }
}
};


export const getRestaurantById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try{
  const restaurant = await getById(parseInt(id));
  res.status(200).json(restaurant);
  }
  catch(errorMessage)
  {
    res.status(500).send(errorMessage);
  }
};


export const addRestaurant = async (req: Request, res: Response) => {
  const { name, isKosher, cuisines } = req.body;
  try{
    await addToSystem(name,isKosher,cuisines);
    res.status(201).send(); //201= created
  }
  catch(errorMessage)
  {
    res.status(500).send(errorMessage);
  }
};


export const updateRestaurant = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, isKosher, cuisines } = req.body;
  try{
    await update(parseInt(id), name,isKosher,cuisines);
    res.status(200).send();
  }
  catch(errorMessage)
  {
    res.status(500).send(errorMessage);
  }
};


export const deleteRestaurant = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(204).send();
  try{
    await deleteById(parseInt(id));
    res.status(200).send();
  }
  catch(errorMessage)
  {
    res.status(500).send(errorMessage);
  }

};
