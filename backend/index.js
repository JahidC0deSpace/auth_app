import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import UserRoutes from "./routes/UserRoutes.js";
import helmet from "helmet";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());
const PORT = process.env.PORT || 3000;

app.use("/api/user", UserRoutes);

import { verifyToken } from "./middleware/verifyToken.js";
app.get("/api/test", verifyToken, (req, res) => {
  res.send("If you see this, your token is valid!");
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running on port:${PORT}`);
  });
});
