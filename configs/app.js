'use strict';

import express from 'express';
import cors from 'cors';
import morgan from 'morgan'
import helmet  from 'helmet';
import { corsOptions } from './cors-configurations.js';
import { dbConnection } from '../configs/db.js';
import { helmetConfiguration } from "./helmet-configuration.js";
import { requestLimit } from '../middlewares/request-limit.js';
import { errorHandler } from '../middlewares/handle-errors.js';
import contactRoutes from '../src/contacts/contact.router.js';
import taskRoutes from '../src/tasks/task.router.js';

const BASE_URL = '/agendaSexto/v1';

const middlewares = (app) => {
    app.use(helmet(helmetConfiguration)); 
    app.use(cors(corsOptions)); 
    app.use(express.urlencoded( { extended: false, limit: '10mb'}));
    app.use(express.json({limit: '10mb'}));
    app.use(requestLimit);
    app.use(morgan('dev'));
    
}


const routes = (app) => {
    app.use(`${BASE_URL}/contacts`, contactRoutes);
    app.use(`${BASE_URL}/tasks`, taskRoutes);
}

const initServer = async (app) => {
    app = express();
    const PORT = process.env.PORT || 3001

    try {
        dbConnection();
        middlewares(app);
        routes(app);
        app.use(errorHandler);

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
            console.log(`Base URL: http://localhost:${PORT}${BASE_URL}`);
        });
        app.get(`${BASE_URL}/health`, (req, res)=> {
            res.status(200).json(
                {
                status: 'ok',
                service: 'Agenda Sexto',
                version: '1.0.0'
                }
            );
        });
    } catch (error) {
        console.log(error);
    }
}

export { initServer};