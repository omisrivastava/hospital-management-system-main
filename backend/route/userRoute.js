import express from "express";
import {
  patientRegister,
  login,
  newadmin,
  getAlldoctors,
  getusersdetails,
  logout,
  logoutpatient,
  addDoctor,
} from "../controller/userController.js";
import {
  isAdminAuthenticated,
  isPatientAuthenticated,
} from "../middlewares/auth.js";
const router = express.Router();
router.post("/patient/register", patientRegister);
router.post("/login", login);
router.post("/admin/addnew", newadmin);
router.get("/doctors", getAlldoctors);
router.get("/admin/me", isAdminAuthenticated, getusersdetails);
router.get("/patient/me", isPatientAuthenticated, getusersdetails);
router.get("/admin/logout", isAdminAuthenticated, logout);
router.get("/patient/logoutpatient", isAdminAuthenticated, logoutpatient);
router.post("/doctor/addnew", isAdminAuthenticated, addDoctor);
export default router;
