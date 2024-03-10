import express from "express";
import { MoviesLobby } from "../models/movieModel.js";
import {
  authenticateToken,
  authorizeAdmin,
} from "../authentication/authMiddleware.js";
import { cacheMiddleware, cache } from "../cache/cacheMiddleware.js";

const router = express.Router();

router.post(
  "/",
  authenticateToken,
  authorizeAdmin,
  async (request, response) => {
    try {
      if (!request.body.title || !request.body.genre || !request.body.rating) {
        return response.status(400).send({
          messagge: "Send all required fields: title, genre, rating",
        });
      }

      const newMovie = {
        title: request.body.title,
        genre: request.body.genre,
        rating: request.body.rating,
      };

      const movie = await MoviesLobby.create(newMovie);

      return response.status(201).send(movie);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  }
);

router.get("/search", async (request, response) => {
  try {
    const { q } = request.query;

    const movies = await MoviesLobby.find({
      $or: [
        { title: { $regex: new RegExp(q, "i") } },
        { genre: { $regex: new RegExp(q, "i") } },
      ],
    });

    return response.status(200).send({
      count: movies.length,
      data: movies,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.get("/", cacheMiddleware, async (request, response) => {
  try {
    const movies = await MoviesLobby.find({});

    cache.set(request.originalUrl || request.url, movies, 3600);

    return response.status(200).send({
      count: movies.length,
      data: movies,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const movie = await MoviesLobby.findById(id);
    if (!movie) {
      return response.status(404).send({ message: "Movie not found" });
    }

    return response.status(200).send(movie);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.put(
  "/:id",
  authenticateToken,
  authorizeAdmin,
  async (request, response) => {
    try {
      if (!request.body.title || !request.body.genre || !request.body.rating) {
        return response.status(400).send({
          messagge: "Send all required fields: title, genre, rating",
        });
      }

      const { id } = request.params;
      const result = await MoviesLobby.findByIdAndUpdate(id, request.body);
      if (!result) {
        return response.status(404).send({ message: "Movie not found" });
      }

      return response
        .status(200)
        .send({ message: "Movie Updated Successfully" });
    } catch (error) {
      console.log(error.message);
      return response.status(500).send({ message: error.message });
    }
  }
);

router.delete(
  "/:id",
  authenticateToken,
  authorizeAdmin,
  async (request, response) => {
    try {
      const { id } = request.params;
      const result = await MoviesLobby.findByIdAndDelete(id);

      if (!result) {
        return response.status(404).send({ message: "Movie not found" });
      }

      return response
        .status(200)
        .send({ message: "Movie deleted successfully" });
    } catch (error) {
      console.log(error.message);
      return response.status(500).send({ message: error.message });
    }
  }
);

export default router;
