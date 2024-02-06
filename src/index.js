import express from "express";
import bodyParser from "body-parser";
import { MONGO_DB_URL, PORT } from "./constants/env_constants.js";
import mongoose from "mongoose";
import authenticationRoute from "./routes/authenticationRoute.js";
import restaurantRoute from "./routes/restaurantRoute.js";
import cartRoute from "./routes/cartRoute.js";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Check if server is working or not
app.get("/ping", (req, res) => {
  res.send({ message: "pong" });
});

app.use("/", authenticationRoute);
app.use("/", restaurantRoute);
app.use("/", cartRoute);

mongoose
  .connect(MONGO_DB_URL)
  .then(() => {
    console.log("DB connected");
    app.listen(process.env.PORT, () => {
      console.log("App is running on port:", PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
