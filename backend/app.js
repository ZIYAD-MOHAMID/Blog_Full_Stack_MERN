const express = require("express");
const xss = require("xss-clean");
const rateLimiting = require("express-rate-limit");
const helmet = require("helmet");
const hpp = require("hpp");

const connectToDB = require("./config/connectToDB");
const { errorHandler, notFound } = require("./middlewares/error");
const cors = require("cors"); // to make F & B work togather
require("dotenv").config();

//connection to db
connectToDB();

// Init app
const app = express();

// Middlewares
app.use(express.json());

// Security Headers (helmet)
app.use(helmet());

//Prevent Http Param Pollution
app.use(hpp());

//Prevent XSS
app.use(xss());

// Rate Limiting
app.use(
  rateLimiting({
    windowMs: 10 * 60 * 1000, // 10 Min
    max: 200,
  })
);

//Cors Policy
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Routes
app.use("/api/auth", require("../backend/routes/authRoute"));
app.use("/api/users", require("../backend/routes/usersRoute"));
app.use("/api/posts", require("../backend/routes/postsRoute"));
app.use("/api/comments", require("../backend/routes/commentRoute"));
app.use("/api/categories", require("../backend/routes/categoriesRoute"));
app.use("/api/password", require("../backend/routes/passwoudRoute"));

//Error Handler Middleware
app.use(notFound);
app.use(errorHandler);

// Running the server
const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(
    ` Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
