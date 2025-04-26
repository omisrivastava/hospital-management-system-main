import mongoose from "mongoose";

export const dbconnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "MERN_STACK_HOSPITAL_SYSTEM",
    })
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((err) => {
      console.log(`some error occured while connecting to the database: ${err}`);
    });
};
