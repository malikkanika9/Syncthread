const router = require("express-promise-router")();
const { validateBody, schemas } = require("../helpers/userValidate");
const validateDbBody = require("../helpers/userDbValidate");
const userController = require("../controllers/userController")
const passport = require("passport");
const passportConf = require("../passport");
const passportSignIn = passport.authenticate("localUser", {
  session: false,
});

router
.route("/signup")
.post(
    validateBody(schemas.validateDetails),
    validateDbBody.checkExistingUser,
    userController.register
);

router
  .route("/login")
  .post(
    validateBody(schemas.validateLogin),
    passportSignIn,
    userController.handleLogin,
    userController.login
  );
module.exports = router