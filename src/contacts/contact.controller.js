import Contact from './contact.model.js';
import { cloudinary } from '../../middlewares/file-uploader.js';

export const getContacts = async (req, res) => {
    try {
        const { page = 1, limit = 10, isActive } = req.query;
        const filter = {isActive};

        const options = {
            page: parseInt(page),   
            limit: parseInt(limit),
            sort: { createdAt: 1 },

        };

        const contacts = await Contact.find(filter)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort(options.sort);

        const total = await Contact.countDocuments(filter);

        res.status(200).json({
            succes: true,
            data: contacts,
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
            message: 'Error al obtener los contactos',
            error: error.message
        });
    }

};

export const getContactsById = async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findById(id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contacto no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            data: contact
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener el contacto',
            error: error.message
        });
    }
};

export const createContact = async (req, res) => {
    try {
        const contactData = req.body;

        if (req.file) {
            const extension = req.file.path.split('.').pop();
            const fileName = req.file.filename;

            const relativePath = fileName.substring(
                fileName.indexOf('contacts/')
            );
    
        contactData.photo = `${relativePath}.${extension}`;
        } else {
            contactData.photo = 'contacts/kinal_sport_nyvxo5';
        }

        const contact = new Contact(contactData);
        await contact.save();
        res.status(201).json({
            succes: true,
            message: 'Contacto creado exitosamente',
            data: contact
        })

    } catch (error) {
        res.status(500).json({
            succes: false,
            message: 'Error al crear el campo',
            error: error.message
        })
    }
};

export const updateContact = async (req, res) => {
    try {
        const { id } = req.params;
        //(...)significa que cuando se colocan la posicion que se coloca traiga todo lo detras de el
        //si se coloco detras traera todo lo despues
        const updateData = {...req.body};

        if (req.file) {
            const currentContact = await Contact.findById(id);

            if (currentContact && currentContact.photo) {
                const photoPath = currentContact.photo;
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
            const relativePath = fileName.includes('contacts/')
                ? fileName.substring(fileName.indexOf('contacts/'))
                : fileName;
            updateData.photo = `${relativePath}.${extension}`;
        }

        const contact = await Contact.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true
        });

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contacto no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Contacto actualizado exitosamente',
            data: contact
        });
    } catch (error) {
        res,status(400).json({
            success: false,
            message: 'Error al actualizar el contacto',
            error: error.message
        });
    }
};

export const changeContactStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const isActive = req.url.includes('/activate');
        const action = isActive ? 'activado' : 'desactivado';

        const contact = await Contact.findByIdAndUpdate(
            id,
            { isActive },
            { new: true }
        );

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contacto no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            message: `Contacto ${action} exitosamente`,
            data: contact
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al cambiar el estado del contacto',
            error: error.message
        });
    }
};