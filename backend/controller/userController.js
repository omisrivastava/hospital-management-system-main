import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";

export const patientRegister = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
    role,
    doctorDepartment,
    docAvtar,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    !gender ||
    !dob ||
    !nic ||
    !role
  ) {
    return next(new ErrorHandler("Please fill in all fields", 400));
  }
  const isregistered = await User.findOne({ email });
  if (isregistered) {
    return next(new ErrorHandler("User already exists", 400));
  }
  const user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
    role: "Patient",
  });
  generateToken(user, "User Registered Successfully", 201, res);
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, confirmPassword, role } = req.body;
  if (!email || !password || !confirmPassword || !role) {
    return next(new ErrorHandler("Please provide all details", 400));
  }
  if (password !== confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(
      new ErrorHandler("user not found as password or email is invalid", 401)
    );
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }
  if (role !== user.role) {
    return next(new ErrorHandler("Invalid Role", 401));
  }
  generateToken(user, "User loggedin Successfully", 201, res);
});
export const newadmin = catchAsyncErrors(async (req, res, next) => {
  const { firstname, lastname, email, phone, nic, dob, gender, password } =
    req.body;
  if (
    !firstname ||
    !lastname ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !password
  ) {
    return next(new ErrorHandler("Please fill full form", 400));
  }
  const isregistered = await User.findOne({ email });
  if (isregistered) {
    return next(new ErrorHandler("  Admin already exists", 400));
  }
  const admin = await User.create({
    firstname,
    lastname,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role: "Admin",
  });
  res.status(200).json({
    success: true,
    message: "New Admin Registered",
    admin,
  });
});
export const getAlldoctors = catchAsyncErrors(async (req, res, next) => {
  const doctors = await User.find({ role: "Doctor" });
  res.status(200).json({
    success: true,
    doctors,
  });
});
export const getusersdetails = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});
export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("adminToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged out successfully",
    });
});
export const logoutpatient = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("patientToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "patient Logged out successfully",
    });
});
// export const addDoctor = catchAsyncErrors(async (req, res, next) => {
//   if (req.files || Object.keys(req.files).length === 0) {
//     return next(new ErrorHandler("Doctor avatar required", 400));
//   }
//   const { docAvtar } = req.files;
//   const allowedformats = ["image/jpeg", "image/jpg", "image/png"];
//   if (!allowedformats.includes(docAvtar.mimetype)) {
//     return next(new ErrorHandler("Invalid image format", 400));
//   }
//   const {
//     firstname,
//     lastname,
//     email,
//     phone,
//     password,
//     gender,
//     dob,
//     nic,
//     doctorDepartment,
//   } = req.body;
//   if (
//     !firstname ||
//     !lastname ||
//     !email ||
//     !phone ||
//     !password ||
//     !gender ||
//     !dob ||
//     !nic ||
//     !doctorDepartment
//   ) {
//     return next(new ErrorHandler("Please fill all fields", 400));
//   }
//   const isregistered = await User.findOne({ email });
//   if (isregistered) {
//     return next(
//       new ErrorHandler(`${isregistered.role} already registered`, 400)
//     );
//   }
//   const cloudinaryResponse = await cloudinary.uploader.upload(
//     docAvtar.tempFilePath
//   );
//   if (!cloudinaryResponse || !cloudinaryResponse.error) {
//     console.error(cloudinaryResponse.error || "unknown error");
//   }
//   const doctor = await User.create({
//     firstname,
//     lastname,
//     email,
//     phone,
//     password,
//     gender,
//     dob,
//     nic,
//     doctorDepartment,
//     role: "Doctor",
//     docAvtar: {
//       public_id: cloudinaryResponse.public_id,
//       url: cloudinaryResponse.secure_url,
//     },
//   });
//   res.status(200).json({
//     success: true,
//     message: " New Doctor added successfully",
//     doctor,
//   });
// });
export const addDoctor = catchAsyncErrors(async (req, res, next) => {
  // Check if req.files exists before accessing its properties
  if (!req.files || Object.keys(req.files).length === 0) {
    console.log("Uploaded files:", req.files);
    return next(new ErrorHandler("Doctor avatar required", 400));
  }

  const { docAvtar } = req.files;

  // Allowed file formats
  const allowedformats = ["image/jpeg", "image/jpg", "image/png"];
  if (!allowedformats.includes(docAvtar.mimetype)) {
    return next(new ErrorHandler("Invalid image format", 400));
  }

  // Extracting form data
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
    doctorDepartment,
  } = req.body;

  // Checking if all required fields are filled
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    !gender ||
    !dob ||
    !nic ||
    !doctorDepartment
  ) {
    return next(new ErrorHandler("Please fill all fields", 400));
  }

  // Checking if doctor is already registered
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(
      new ErrorHandler(`${isRegistered.role} already registered`, 400)
    );
  }

  // Uploading the image to Cloudinary
  let cloudinaryResponse;
  try {
    cloudinaryResponse = await cloudinary.uploader.upload(
      docAvtar.tempFilePath
    );
  } catch (error) {
    return next(new ErrorHandler("Cloudinary upload failed", 500));
  }

  // Checking if Cloudinary upload was successful
  if (
    !cloudinaryResponse ||
    !cloudinaryResponse.public_id ||
    !cloudinaryResponse.secure_url
  ) {
    return next(new ErrorHandler("Image upload failed", 500));
  }

  // Creating a new doctor in the database
  const doctor = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
    doctorDepartment,
    role: "Doctor",
    docAvtar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });

  res.status(200).json({
    success: true,
    message: "New Doctor added successfully",
    doctor,
  });
});
