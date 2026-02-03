'use strict';

import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    contactName: {
        type: String,
        required: true,
        trim: true,
        maxLength: [100, 'El nombre del contacto no puede exceder los 100 caracteres']
    },
    email: {
        type: String,   
        required: true,
        trim: true,
        match: [/.+\@.+\..+/, 'Por favor ingrese un correo electrónico válido']
    },
    phoneNumber: {
        type: String,
        required: false,
        trim: true,
        match: [/^\+?[1-9]\d{1,14}$/, 'Por favor ingrese un número de teléfono válido']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    photo: {
        type: String,
        trim: true,
        default: null
    },
    isActive: {
        type: Boolean,
        default: true
    }
});
 
contactSchema.index({ isActive: 1 });
contactSchema.index({ contactName: 1 });
contactSchema.index({ contactName: 1, isActive: 1 });

export default mongoose.model('Contact', contactSchema);