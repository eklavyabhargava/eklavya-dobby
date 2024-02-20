const express = require("express");
const app = express();
const authenticateUser = require("../middleware/AuthMiddleware");

app.use(authenticateUser);
app.use("/post");

module.exports = app;
