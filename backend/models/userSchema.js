import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
// import * as bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please enter your name"],
    minLength: [3, "must be at least 3 characters"],
  },
  lastName: {
    type: String,
    required: [true, "Please enter your name"],
    minLength: [3, "must be at least 3 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    validate: [validator.isEmail, "Please enter a valid email address"],
  },
  phone: {
    type: String,
    required: [true, "Please enter your phone number"],
    minLength: [11, "must be at least 11 characters"],
    maxLength: [11, "must be at least 11 characters"],
  },

  nic: {
    type: String,
    required: [true, "Please enter your NIC number"],
    minLength: [13, "NIC must be at least 13 characters"],
    maxLength: [13, "NIC must be at least 13 characters"],
  },
  dob: {
    type: Date,
    required: [true, "Please enter your date of birth"],
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [8, "Password must be at least 8 characters"],
    select: false,
  },
  role: {
    type: String,
   required: [true, "User Role Required!"],
    enum: ["Admin", "Patient", "Doctor"],
  },
  doctorDepartment: {
    type: String,
  },
  docAvtar: {
    public_id: String,
    url: String,
  },
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateToken = async function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};
export const User = mongoose.model("User", userSchema);
