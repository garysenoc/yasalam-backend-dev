const Category = require("../../models/Category");

const getAllCategory = async (req, res) => {
  try {
    const category = await Category.find();

    res.status(200).json({
      status: "success",
      results: category.length,
      data: {
        category,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};


module.exports = {
    getAllCategory
}