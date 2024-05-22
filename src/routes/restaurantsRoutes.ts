import { Router } from 'express';
import { getAllRestaurants, getRestaurantById, addRestaurant, updateRestaurant, deleteRestaurant } from '../controllers/restaurantController';

const restaurantsRouter = Router();

restaurantsRouter.get('/', getAllRestaurants);
restaurantsRouter.get('/:id', getRestaurantById);
restaurantsRouter.post('/', addRestaurant);
restaurantsRouter.put('/:id', updateRestaurant);
restaurantsRouter.delete('/:id', deleteRestaurant);

export default restaurantsRouter;
