const jwt = require("jsonwebtoken");
const config = require("../config/config");
const db = require("../models");
const { userService } = require("../services/index");

verifyToken = async (req, res, next) => {
  let token = req.headers["access_token"] || req.query.token;
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  jwt.verify(token, config.jwt.secret, async (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    let email = decoded.email;
    const user = await userService.getUserByEmail(email);

    if (user.status == 0) {
      res.status(user.data.status).send(user.data);
    }
    if (user.status == -1) {
      res.status(user.data.status).send(user.data);
    }

    let USER = user.data.data;
    req.user = USER;
    // res.status(200).send(USER);
    // res.render("pages/info");

    next();
  });
};

const authJwt = {
  verifyToken,
};
module.exports = authJwt;
