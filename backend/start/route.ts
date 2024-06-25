import { Router } from 'express';

import ApisController from 'backend/app/controllers/Http/ApisController';
import UsersController from 'backend/app/controllers/Http/UsersController';
import gameRecommendationController from 'backend/app/controllers/Http/gameRecommendationController';
import isAuth from 'App/Middleware/Auth';


const Route = Router();

/*
|--------------------------------------------------------------------------
| Authenticated Routes
|--------------------------------------------------------------------------
*/

// USER
Route.get('/user/me', isAuth, UsersController.me);
Route.post('/user/register', isAuth, UsersController.register);
Route.post('/user/update', isAuth, UsersController.update);

// GAME RECOMMENDATION
Route.post('/game-recommendation/create', isAuth, gameRecommendationController.create);
Route.post('/game-recommendation/update/:recommendationId', isAuth, gameRecommendationController.update);
Route.get('/game-recommendation/list', isAuth, gameRecommendationController.view_all_by_user);

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

Route.get('/health', ApisController.health);

// USER
Route.get('/user/:username/info', UsersController.view_info_of_user_by_public);

export { Route as routes };