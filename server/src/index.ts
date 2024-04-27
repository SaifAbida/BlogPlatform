import "reflect-metadata";
import { createExpressServer, useContainer } from "routing-controllers";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { container } from "./containers/container";
import { UserControllers } from "./controllers/UserControllers";

dotenv.config();

useContainer(container);
const app = createExpressServer({
  controllers: [UserControllers],
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
