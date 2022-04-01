const express = require("express");
// const auth = require('../../middlewares/auth');
// const validate = require('../../middlewares/validate');
// const userValidation = require('../../validations/user.validation');
const { userController } = require("../../controllers");
const { authMiddleware } = require("../../middlewares");
const router = express.Router();

router.get("/register", userController.registerView);
router.post("/register", userController.createUser);
router.post("/login", userController.logIn);
router.get("/userinfo", authMiddleware.verifyToken ,userController.userinfo);
router.get("/login", userController.loginView);

module.exports = router;
