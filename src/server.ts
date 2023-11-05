import express from "express";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes";
import errorHandler from "./middleware/errorHandler";
import connectDb from "./config/dbConnection";
dotenv.config(); // load environment variables

connectDb();
const app = express();

const port = process.env.PORT || 5000;

// parse JSON data from client
app.use(express.json());

app.use("/api/tasks", taskRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`);
});
