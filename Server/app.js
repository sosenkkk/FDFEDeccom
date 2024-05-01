const mongoose = require("mongoose");
const { app } = require("./server");

const PORT = process.env.PORT || 8080;
const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster1.wxdleee.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`;


mongoose.connect(MONGO_URI).then(() => {
  app.listen(PORT);
  console.log("connected");
});
