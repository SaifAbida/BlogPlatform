import "reflect-metadata";
import { createExpressServer, useContainer } from "routing-controllers";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { container } from "./containers/container";
import { UserControllers } from "./controllers/UserControllers";
import { PostControllers } from "./controllers/PostControllers";
import express from "express";
import path from "path";

dotenv.config();

useContainer(container);
const app = createExpressServer({
  controllers: [UserControllers, PostControllers],
  cors: {
    origin: "*",
    credentials: true,
  },
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(
      `Database is connected and server is running on PORT ${process.env.PORT}`
    );
  });
});
