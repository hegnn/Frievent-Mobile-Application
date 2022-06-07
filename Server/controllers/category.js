const Category = require("../models/Category");

module.exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).send(categories);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
