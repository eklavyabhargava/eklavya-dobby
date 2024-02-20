const User = require("../models/UserModel");

const authenticateUser = async (req, res, next) => {
  try {
    if (!req.session.userId) {
      return res.status(401).send({ errMsg: "Unauthorized! Please log in." });
    }

    const user = await User.findById(req.session.userId);

    if (!user) {
      req.session.destroy();
      return res.status(401).send({ errMsg: "Unauthorized!" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send({ errMsg: "Internal error occurred" });
  }
};

module.exports = authenticateUser;
