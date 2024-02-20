const express = require("express");
const app = express();
const userHandler = require('../controller/UserHandler')

app.use('/auth', userHandler);

export default app;
