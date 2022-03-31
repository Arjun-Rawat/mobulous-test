const httpStatus = require("http-status");
const { userService } = require("../services");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/config");
// register
const createUser = async (req, res) => {
  const user = await userService.createUser(req.body);
  if (user.status == 1) {
    res.status(httpStatus.CREATED).send(user.data);
  }
  if (user.status == 0) {
    res.status(user.data.status).send(user.data);
  }
};

const logIn = async (req, res) => {
  const user = await userService.getUserByEmail(req.body.email);
  if (user.status == 0) {
    res.status(user.data.status).send(user.data);
  }
  if (user.status == -1) {
    res.status(user.data.status).send(user.data);
  } else {
    let USER = user.data.data;
    let passwordIsValid = bcrypt.compareSync(req.body.password, USER.password);

    if (!passwordIsValid) {
      res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }
    let token = jwt.sign({ id: USER.id, name: USER.name, email: USER.email }, config.jwt.secret, {
      expiresIn: config.jwt.accessExpirationMinutes,
    });

    res.status(200).send({
      id: USER.name,
      username: USER.username,
      email: USER.email,
      accessToken: token,
    });
  }
};

// const getUsers = async (req, res) => {
//   const filter = pick(req.query, ["name", "role"]);
//   const options = pick(req.query, ["sortBy", "limit", "page"]);
//   const result = await userService.queryUsers(filter, options);
//   res.send(result);
// };

const getUser = async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  res.send(user);
};

const loginView = (req, res) => {
  res.render("pages/login");
};

const registerView = (req, res) => {
  res.render("pages/register");
};

module.exports = {
  createUser,
  logIn,
  //   getUsers,
  getUser,
  loginView,
  registerView,
};
