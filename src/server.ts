import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes";
import errorHandler from "./middleware/errorHandler";
import connectDb from "./config/dbConnection";
import userRoutes from "./routes/userRoutes";
import authenticateToken from "./middleware/authenticateToken";
import limiter from "./limiter";

dotenv.config(); // load environment variables

connectDb();
const app = express();

const port = process.env.PORT || 5000;

app.use(cors());

// parse JSON data from client
app.use(express.json());

app.use(limiter);

app.use("/api/tasks", authenticateToken, taskRoutes);

app.use("/api/users", userRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`);
});
