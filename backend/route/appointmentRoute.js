import express from 'express';
import { postAppointment,getAllAppointments} from '../controller/appointmentController.js';
import { isAdminAuthenticated,isPatientAuthenticated } from '../middlewares/auth.js';
const router = express.Router();
router.post('/post',isPatientAuthenticated,postAppointment)
router.get('/getall', isAdminAuthenticated, getAllAppointments);
router.get('/update/:id', isAdminAuthenticated, getAllAppointments);
export default router;