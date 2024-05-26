import { Router } from 'express';
import { getRestaurants, getRestaurantById, addRestaurant, updateRestaurant, deleteRestaurant } from '../controllers/restaurantController';

const restaurantsRouter = Router();

restaurantsRouter.get('/', getRestaurants);
restaurantsRouter.get('/:id', getRestaurantById);
restaurantsRouter.post('/', addRestaurant);
restaurantsRouter.put('/:id', updateRestaurant);
restaurantsRouter.delete('/:id', deleteRestaurant);

export default restaurantsRouter;