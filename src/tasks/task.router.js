import { Router } from 'express';
import {
        getTasks,
        getTaskById,
        createTask,
        updateTask,
        changeTaskStatus
    } from "./task.controller.js";

import {
        validateCreateTask, 
        validateUpdateTaskRequest,
        validateTaskStatusChange,
        validateGetTaskById
    } from "../../middlewares/tasks-validators.js";


const router = Router();

//GET
router.get('/', getTasks);
router.get('/:id', validateGetTaskById, getTaskById);

//POST
router.post('/', validateCreateTask, createTask);
//PUT
router.put('/:id', validateUpdateTaskRequest, updateTask);
router.put('/:id/activate', validateTaskStatusChange, changeTaskStatus);
router.put('/:id/desactivate', validateTaskStatusChange, changeTaskStatus);

export default router;