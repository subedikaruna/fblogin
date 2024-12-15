import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import AuthRoute from "./routes/Auth.route.js";
dotenv.config();
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
mongoose
  .connect(process.env.MONGODB_CONN)
  .then(() => console.log("database connected"))
  .catch((err) => console.log("database not connected", err));

app.use("/api/auth", AuthRoute);
const port = process.env.PORT;
app.listen(port, () => {
  console.log("Port is listening at ", port);
});
