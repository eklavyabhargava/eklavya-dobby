const express = require("express");
const cors = require("cors");
const connectDb = require("./db");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT;

connectDb();

app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use("/api", require("./routes/auth.routes"));
app.use("/api", require("./routes/posts.routes"));

app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});
