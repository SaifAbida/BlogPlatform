import "reflect-metadata";
import { createExpressServer } from "routing-controllers";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = createExpressServer({
  cors: {
    origin: "*",
    credentials: true,
  },
});

mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(
      `Database is connected and server is running on PORT ${process.env.PORT}`
    );
  });
});
