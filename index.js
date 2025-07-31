import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import path from "path";
import userRoutes from "./Routes/UserRoutes.js";
import videoRoutes from './Routes/VideoRoutes.js';
import likeRoutes from './Routes/LikeRoutes.js';
import watchLaterRoutes from './Routes/WatchLaterRoutes.js';
import historyRoutes from './Routes/HistoryRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json({ limit: "30mb", extended: "true" }));
app.use(express.urlencoded({ limit: "30mb", extended: "true" }));
app.use("/uploads",express.static(path.join("uploads")))

app.get("/", (req, res) => {
  res.send("YouTube backend working...");
});

app.use(bodyParser.json());
app.use("/user", userRoutes);
app.use("/video", videoRoutes); 
app.use("/like", likeRoutes); 
app.use("/watch", watchLaterRoutes); 
app.use("/history", historyRoutes); 
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});

const DBURL = process.env.DB_URL;
mongoose
  .connect(DBURL)
  .then(() => {
    console.log("DataBase Connected Successfully");
  })
  .catch((error) => {
    console.log(`Error: ${error}`);
  });
