const User = require("../models/User");
const jwt = require("jwt-simple");

module.exports.register = async (req, res, next) => {
  const { email, password, name, surname } = req.body;
  let user = null;
  try {
    user = new User({ email, password, name, surname });
    await user.save();
    res.status(201).send({
      _id: user._id,
      email: user.email,
      fullName: user.name + " " + user.surname,
      token: jwt.encode({ id: user._id }, process.env.JWT_SECRET),
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      $and: [{ email: email }, { password: password }],
    });
    if (user) {
      res.status(200).send({
        _id: user._id,
        email: user.email,
        name: user.name,
        surname: user.surname,
        token: jwt.encode({ id: user._id }, process.env.JWT_SECRET),
      });
    } else {
      res.status(401).send({
        error: "credentialsIncorrect",
      });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};
