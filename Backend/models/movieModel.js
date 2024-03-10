import mongoose from "mongoose";

const MovieSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export const MoviesLobby = mongoose.model("Movie", MovieSchema);
