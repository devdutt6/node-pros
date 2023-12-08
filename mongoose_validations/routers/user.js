const router = require("express").Router();
const { check } = require("express-validator");
const { SignUp, CreateProfile, GetProfile } = require("../controllers/user");
// const { CreateProfile } = require('../controllers/user');
// const { userSignUp } = require('../checks/userSignUp');
const { User } = require("../modules/user");

router.post(
  "/signup/:id",
  check("email").custom((value) => {
    return User.findOne({ email: value }).then((data) => {
      if (data) {
        return Promise.reject("Already in Use");
      }
    });
  }),
  SignUp
);

router.post("/createProfile", check("user").not().isEmpty(), CreateProfile);
router.get("/getProfile/:user", check("user").not().isEmpty(), GetProfile);
// router.post('/createProfile',CreateProfile);

module.exports = router;
