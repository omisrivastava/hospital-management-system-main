import mongoose from "mongoose";
import validator from "validator";
const messageSchema = new mongoose.Schema({
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
  message: {
    type: String,
    required: [true, "Please enter your message"],
    minLength: [10, "must be at least 10 characters"],
  },
});
export const Message = mongoose.model("Message", messageSchema);
