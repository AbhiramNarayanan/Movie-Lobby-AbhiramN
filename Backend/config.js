import crypto from "crypto";

export const PORT = process.env.PORT || 5555;

export const mongoDBURL =
  "mongodb+srv://MovieLobbyByAbhiram:AbhiramMovieLobby1700@movielobby.fem2g6v.mongodb.net/MovieLobbyCollection?retryWrites=true&w=majority&appName=MovieLobby";

const secretKey = crypto.randomBytes(32).toString("hex");

export const JWT_SECRET = secretKey;
