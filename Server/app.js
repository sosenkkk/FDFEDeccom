const dotenv = require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const sellerRoutes = require("./routes/sellerRoutes");
const csrfRoutes = require("./middleware/csrfMiddleWare");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster1.wxdleee.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`;
const app = express();

const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://next-carbon-git-main-sosenkkk.vercel.app",
      "https://next-carbon.vercel.app",
      "https://next-carbon-al7l5k1lk-sosenkkk.vercel.app",
    ],
    methods: ["POST", "GET", "HEAD", "PUT", "DELETE"],
    credentials: true,
  })
);

const logsDir = path.join(__dirname, "Logs");
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

const logFileName = `${uuidv4()}.log`;
const accessLogStream = fs.createWriteStream(path.join(logsDir, logFileName), {
  flags: "a",
});

app.use(cookieParser());
app.use(bodyParser.json());

app.use(
  morgan(
    (tokens, req, res) => {
      return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
      ].join(" ");
    },
    { stream: accessLogStream }
  )
);

// Check log file size and create a new file if exceeds 5MB
app.use((req, res, next) => {
  const fileSizeInBytes = fs.statSync(accessLogStream.path).size;
  const fileSizeInMB = fileSizeInBytes / (1024 * 1024);

  if (fileSizeInMB > 5) {
    // Create a new access log stream
    accessLogStream.end();
    
    accessLogStream = createAccessLogStream();
  }

  next();
});

app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/csrf", csrfRoutes);

app.use(authRoutes);

app.use(adminRoutes);

app.use(userRoutes);

app.use("/seller", sellerRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const data = error.data;
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message, data: data });
});

mongoose.connect(MONGO_URI).then(() => {
  app.listen(PORT);
  console.log("connected");
});
