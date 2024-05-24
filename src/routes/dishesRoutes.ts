import { Router } from 'express';
import { addDish, updateDish, deleteDish, getDishesByRestaurant } from '../controllers/dishController';

const dishesRouter = Router({ mergeParams: true}); // keep the request params from parent router

dishesRouter.post('/', addDish);
dishesRouter.put('/:dishId', updateDish);
dishesRouter.delete('/:dishId', deleteDish);
dishesRouter.get('/', getDishesByRestaurant);

export default dishesRouter;
