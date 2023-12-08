const { check, validationResult } = require("express-validator");

exports.userSignUp = (req, res, next) => {
  try {
    check("email")
      .not()
      .isEmpty()
      .isEmail()
      .withMessage("Enter a proper email");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({
        Field: errors.errors[0].param,
        Message: errors.errors[0].msg,
      });
    }
    next();
  } catch (err) {
    console.error(err.message);
    return res.send(err.message);
  }
};
