import mongoose from "mongoose";

const connectDb = async () => {
  const connectionString = process.env.CONNECTION_STRING;

  if (!connectionString) {
    throw new Error("CONNECTION_STRING environment variable is not set.");
  }
  try {
    const connect = await mongoose.connect(connectionString);

    console.log(
      `Database connected: ${connect.connection.host}, ${connect.connection.name}`
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectDb;
