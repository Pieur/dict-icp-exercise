import { Router } from 'express';

import ApisController from 'backend/app/controllers/Http/ApisController';
import UsersController from 'backend/app/controllers/Http/UsersController';
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


/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

Route.get('/health', ApisController.health);

// USER
Route.get('/user/:username/info', UsersController.view_info_of_user_by_public);

export { Route as routes };