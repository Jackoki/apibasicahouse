// Importando a classe Router do módulo express para criar um novo objeto de rotas
import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/upload';

import SessionController from './controllers/SessionController';
import HouseController from './controllers/HouseController';
import DashboardController from './controllers/DashboardController';
import ReserveController from './controllers/ReserveController';


// Criando um novo objeto de rotas usando o Router
const routes = new Router();
const upload = multer(uploadConfig);

// Definindo uma rota para a URL '/'
routes.post('/sessions', SessionController.store);
routes.post('/houses', upload.single('thumbnail'), HouseController.store);
routes.get('/houses', HouseController.index);
routes.put('/houses/:house_id', upload.single('thumbnail'), HouseController.update);
routes.delete('/houses', HouseController.destroy);

routes.get('/dashboard', DashboardController.show);

routes.post('/houses/:house_id/reserve', ReserveController.store);
routes.get('/reserves', ReserveController.index);
routes.delete('/reserves/cancel', ReserveController.destroy);

// Exportando o objeto de rotas para que possa ser utilizado em outros arquivos
export default routes;