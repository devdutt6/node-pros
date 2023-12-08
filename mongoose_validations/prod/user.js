const { validationResult } = require("express-validator");
const { User } = require("../modules/user");
const { Person } = require("../modules/person");

exports.SignUp = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json({
        Field: errors.errors[0].param,
        Message: errors.errors[0].msg,
      });
    }

    const { email, name, line1, line2, password } = req.body; // const { id } = req.params;
    // const { match,limit,sort } = req.query;

    const user = new User();
    user.email = email;
    user.name = name;
    user.address.line1 = line1;
    user.address.line2 = line2;
    user.password = password;
    const rev = await user.save();
    return res.json(rev);
  } catch (err) {
    console.error(err.message);
    return res.send(err.message);
  }
};

exports.CreateProfile = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json({
        Field: errors.errors[0].param,
        Message: errors.errors[0].msg,
      });
    }

    const { firstName, lastName, user, address } = req.body;
    const person = new Person();
    person.firstName = firstName;
    person.user = user;
    person.lastName = lastName;
    person.address = address;
    const rev = await person.save();
    return res.json(rev);
  } catch (err) {
    console.error(err.message);
    return res.send(err.message);
  }
};

exports.GetProfile = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json({
        Field: errors.errors[0].param,
        Message: errors.errors[0].msg,
      });
    }

    const { user } = req.params;
    const person = await Person.findOne({
      userName: user,
    });
    console.log("FullName:", person.fullName);
    console.log("user:", person.user);
    console.log("UserName:", person.userName);
    console.log("address:", person.address);
    person.findSameLastName((err, data) => {
      console.log("similar:", data);
    });
    return res.json(person);
  } catch (err) {
    console.error(err.message);
    return res.send(err.message);
  }
};
