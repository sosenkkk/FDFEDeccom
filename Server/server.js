const dotenv = require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const sellerRoutes = require("./routes/sellerRoutes");
const csrfRoutes = require("./middleware/csrfMiddleWare");
const swaggerJSDoc=require("swagger-jsdoc");
const swaggerUi=require("swagger-ui-express");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

const { v4: uuidv4 } = require("uuid");
const Product = require("./model/Product");

const app = express();

const PORT = process.env.PORT || 8080;

const options = {
  definition: {
      openapi: '3.0.0',
      info: {
          title: "Carbon",
          version: '1.0.0'
      },
      servers: [
          {
              url: `http://localhost:${PORT}/`
          }
      ],
      tags: [
        { name: 'Authentication', description: 'Endpoints for user authentication' },
        { name: 'User', description: 'Endpoints for user actions' }
      ]
  },
  apis: ['./app.js', './routes/*.js', "./doc_Schemas.js"]
}

const swaggerspec = swaggerJSDoc(options);

//middleware for swagger-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerspec));

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://next-carbon-git-main-sosenkkk.vercel.app",
      "https://next-carbon.vercel.app",
      "https://next-carbon-al7l5k1lk-sosenkkk.vercel.app",
      "https://fdfe-deccom.vercel.app/"
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

app.get("/createProductModelIndex", async (req, res) => {
  try {
      const indexes = await Product.listIndexes();
      console.log(indexes);

      res.status(201).json({message: "index created successfully!"});
  } catch (err) {
    console.log(err);
    res.status(500).json({message: "something went wrong!"});
  }
});

app.get("/dropProductModelIndex", (req, res) => {

})

app.use((error, req, res, next) => {
  console.log(error);
  const data = error.data;
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message, data: data });
});

module.exports = { app };