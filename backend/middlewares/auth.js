import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";
export const isAdminAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.adminToken;
  console.log(req.cookies);

  if (!token) {
    return next(new ErrorHandler("Admin not authenticated", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  console.log(decoded);

  req.user = await User.findById(decoded.id);
  if (req.user.role !== "Admin") {
    return next(new ErrorHandler(`${req.user.role} not authorized`, 401));
  }
  next();
});
export const isPatientAuthenticated = catchAsyncErrors(
  async (req, res, next) => {
    const token = req.cookies.patientToken;
    if (!token) {
      return next(new ErrorHandler("Patient not authenticated", 401));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    if (req.user.role !== "Patient") {
      return next(new ErrorHandler(`${req.user.role} not authorized`, 401));
    }
    next();
  }
);
