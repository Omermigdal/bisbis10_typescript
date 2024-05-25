import { Request, Response } from 'express';
import { Dish_addToSystem,Dish_deleteById,Dish_getByRestaurantId,Dish_update } from '../services/dishService';


export const addDish = async (req: Request, res: Response) => {
  const restaurantId= parseInt(req.params.id);
  const { name, description, price } = req.body;
  try{
    await Dish_addToSystem( name, description, price,restaurantId);
    res.status(201).send(); //201= created
  }
  catch(errorMessage)
  {
    res.status(500).send(errorMessage);
  }
};


export const updateDish = async (req: Request, res: Response) => {
  const { id, dishId } = req.params;
  const { name, description, price } = req.body;
  try{
    await Dish_update(name,description,price,parseInt(id),parseInt(dishId))
    res.status(200).send();
  }
  catch(errorMessage)
  {
    res.status(500).send(errorMessage);
  }
};




export const deleteDish = async (req: Request, res: Response) => {
  const { dishId } = req.params;
try{
  await Dish_deleteById(parseInt(dishId));
  res.status(204).send();
}

  catch(errorMessage)
  {
    res.status(500).send(errorMessage);
  }
};

export const getDishesByRestaurant = async (req: Request, res: Response) => {
  const { id } = req.params;
  try{
  const dishes = await Dish_getByRestaurantId(parseInt(id));
  res.status(200).json(dishes);
  }
  catch(errorMessage)
  {
    res.status(500).send(errorMessage);
  }
  
};
