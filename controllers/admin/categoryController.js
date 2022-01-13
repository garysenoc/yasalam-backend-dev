const Category = require("../../models/Category");
const Outlet = require("../../models/Outlet");
const Branch = require("../../models/Branch");

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

const getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.status(200).json({
      status: "success",
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

const createCategory = async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        newCategory,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    const noCategory = await Category.findOne({ name: "Uncategorize" });

    await Outlet.updateMany(
      { category: category },
      { category: noCategory._id },
    );
    await Branch.updateMany(
      { category: category },
      { category: noCategory._id },
    );

    await Category.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      message: `Successfully deleted`,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
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

const getAllCategoryYasalam = async (req, res) => {
  try {
    const category = await Category.find({ isYasalam: true });

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
  getAllCategory,
  getCategory,
  createCategory,
  deleteCategory,
  updateCategory,
  getAllCategoryYasalam,
};
