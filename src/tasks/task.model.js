'use strict';

import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: [150, 'El título de la tarea no puede exceder los 150 caracteres']
    },
    description: {
        type: String,
        required: false,
        trim: true,
        maxLength: [500, 'La descripción de la tarea no puede exceder los 500 caracteres']
    },
    expiredDate: {
        type: Date,
        required: false
    },
    priority: {
        type: String,
        enum: ['Baja', 'Media', 'Alta'],
        default: 'Media'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: false
    }
});

taskSchema.index({ isActive: 1 });
taskSchema.index({ expiredDate: 1 });
taskSchema.index({ priority: 1, isActive: 1 });

export default mongoose.model('Task', taskSchema);