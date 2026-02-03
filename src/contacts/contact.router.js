import { Router } from 'express';
import {
        getContacts,
        getContactsById,
        createContact,
        updateContact,
        changeContactStatus
    } from "./contact.controller.js";

import {
        validateCreateContact, 
        validateUpdateContactRequest,
        validateContactStatusChange,
        validateGetContactById
    } from "../../middlewares/contacts-validators.js";

import { uploadContactImage } from "../../middlewares/file-uploader.js";
import { cleanupUploadedFileOnFinish } from '../../middlewares/delete-file-on-error.js';

const router = Router();

//GET
router.get('/', getContacts);
router.get('/:id', validateGetContactById, getContactsById);

//POST
router.post('/', uploadContactImage.single('image'),cleanupUploadedFileOnFinish, validateCreateContact, createContact);

//PUT
router.put('/:id', uploadContactImage.single('image'), validateUpdateContactRequest, updateContact);
router.put('/:id/activate', validateContactStatusChange, changeContactStatus);
router.put('/:id/desactivate', validateContactStatusChange, changeContactStatus);


export default router;