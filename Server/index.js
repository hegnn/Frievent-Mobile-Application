require("dotenv").config();
const express = require("express");
const cors = require("cors");
//const bodyParser = require('body-parser');
const helmet = require("helmet");
const mongoose = require("mongoose");
const compression = require("compression");
const path = require("path");
//const jwt = require('jwt-simple');
const errorController = require("./controllers/error");

const app = express();
const apiRouter = require("./routes/index");
app.use(helmet());
app.use(helmet.hidePoweredBy());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("trust proxy", 1);
app.use(apiRouter);
app.use(errorController);

const PORT = process.env.PORT || 9000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Database");
  });

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
