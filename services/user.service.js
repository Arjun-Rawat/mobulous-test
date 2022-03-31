const httpStatus = require("http-status");
const { userModel } = require("../models");

const createUser = async (userBody) => {
  if (await userModel.isEmailTaken(userBody.email)) {
    return { status: 0, data: { status: httpStatus.BAD_REQUEST, message: "Email already taken" } };
  }
  return await userModel
    .create(userBody)
    .then((data) => {
      return { status: 1, data: { status: httpStatus.CREATED, user: data } };
    })
    .catch((err) => {
      return { status: 0, data: { error: err.message, status: httpStatus.BAD_REQUEST } };
    });

  // return userModel.create(userBody);
};

const getUserById = async (id) => {
  return userModel.findById(id);
};

const getUserByEmail = async (email) => {
  return await userModel
    .findOne({ email })
    .then((data) => {
      if (!data) {
        return { status: -1, data: { status: 404, message: "No such user found" } };
      }
      return { status: 1, data: { status: 200, data: data } };
    })
    .catch((err) => {
      return { status: 0, data: { error: err.message, status: httpStatus.BAD_REQUEST } };
    });
};

module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
};
