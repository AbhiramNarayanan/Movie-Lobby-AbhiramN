import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { MoviesLobby } from "./models/movieModel.js";
import moviesRoute from "./routes/moviesRoute.js";
import cors from "cors";
import authRoute from "./routes/authRoute.js";

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to Movies Lobby By Abhiram N");
});

app.use("/movies", moviesRoute);
app.use("/auth", authRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to Database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
