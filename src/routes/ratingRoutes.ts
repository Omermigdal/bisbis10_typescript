import { Router } from 'express';
import { addRating } from '../controllers/ratingController';

const ratingsRouter = Router();

ratingsRouter.post('/', addRating);

export default ratingsRouter;