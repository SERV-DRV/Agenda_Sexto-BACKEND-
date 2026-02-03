import Task from './task.model.js';
import { cloudinary } from '../../middlewares/file-uploader.js';

export const getTasks = async (req, res) => {
    try {
        const { page = 1, limit = 10, isActive } = req.query;
        const filter = {isActive};

        const options = {
            page: parseInt(page),   
            limit: parseInt(limit),
            sort: { createdAt: 1 },

        };

        const tasks = await Task.find(filter)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort(options.sort);

        const total = await Task.countDocuments(filter);

        res.status(200).json({
            succes: true,
            data: tasks,
            pagination: {
                cuurentPage: page,
                totalPages: Math.ceil(total / limit),
                totalRecords: total,
                limit: limit
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener las tareas',
            error: error.message
        });
    }

};

export const getTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Tarea no encontrada'
            });
        }

        res.status(200).json({
            success: true,
            data: task
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener la tarea',
            error: error.message
        });
    }
};

export const createTask = async (req, res) => {
    try {
        const taskData = req.body;

        if (req.file) {
            const extension = req.file.path.split('.').pop();
            const fileName = req.file.filename;

            const relativePath = fileName.substring(
                fileName.indexOf('contacts/')
            );
    
        taskData.photo = `${relativePath}.${extension}`;
        } else {
            taskData.photo = 'contacts/kinal_sport_nyvxo5';
        }

        const task = new Task(taskData);
        await task.save();
        res.status(201).json({
            succes: true,
            message: 'Tarea creada exitosamente',
            data: task
        })

    } catch (error) {
        res.status(500).json({
            succes: false,
            message: 'Error al crear la tarea',
            error: error.message
        })
    }
};

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        //(...)significa que cuando se colocan la posicion que se coloca traiga todo lo detras de el
        //si se coloco detras traera todo lo despues
        const updateData = {...req.body};

        if (req.file) {
            const currentTask = await Task.findById(id);

            if (currentTask && currentTask.photo) {
                const photoPath = currentTask.photo;
                const photoWithoutExt = photoPath.substring(
                    0, photoPath.lastIndexOf('.')
                );
                const publicId = `angendaSexto/${photoWithoutExt}`;

                try{
                    await cloudinary.uploader.destroy(publicId);
                } catch (error) {
                    console.error(`Error al eliminar la imagen anterior:', ${deleteError.message}`
                    );
                }
            }

            const extension = req.file.path.split('.').pop();
            const fileName = req.file.filename;
            const relativePath = fileName.includes('tasks/')
                ? fileName.substring(fileName.indexOf('tasks/'))
                : fileName;
            updateData.photo = `${relativePath}.${extension}`;
        }

        const task = await Task.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true
        });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Tarea no encontrada'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Tarea actualizada exitosamente',
            data: task
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al actualizar la tarea',
            error: error.message
        });
    }
};

export const changeTaskStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const isActive = req.url.includes('/activate');
        const action = isActive ? 'activado' : 'desactivado';

        const task = await Task.findByIdAndUpdate(
            id,
            { isActive },
            { new: true }
        );

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Tarea no encontrada'
            });
        }

        res.status(200).json({
            success: true,
            message: `Tarea ${action} exitosamente`,
            data: task
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al cambiar el estado de la tarea',
            error: error.message
        });
    }
};