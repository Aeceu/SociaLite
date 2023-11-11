const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectBD = require("./utils/connectDB");
const AuthRouter = require("./routes/AuthRouter");
const UserRouter = require("./routes/UserRouter");
const PostRouter = require("./routes/PostRouter");

//* Configuration
require("dotenv").config();
const app = express();

//* Middleware
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//* Database
connectBD();

//* Routes
app.use("/api/v1", AuthRouter);
app.use("/api/v1", UserRouter);
app.use("/api/v1", PostRouter);

//* Listen
const PORT = 4200;
app.listen(PORT, () => {
  console.log(`Listening to port:${PORT}`);
});
