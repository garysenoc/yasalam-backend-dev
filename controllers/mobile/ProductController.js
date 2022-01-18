const Product = require("../../models/Product");
const Outlet = require("../../models/Outlet");
const bcrypt = require("bcryptjs");

const getAllProduct = async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json({
      status: "success",
      results: product.length,
      data: {
        product,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const getProduct = async (req, res) => {
  // done
  try {
    const newProduct = await Product.findById(req.params.id);

    res.status(201).json({
      status: "success",
      data: {
        newProduct,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create({
      ...req.body,
    });

    res.status(201).json({
      status: "success",
      data: {
        newProduct,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
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

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const updateProductBuy = async (req, res) => {
  try {
    const { productId } = req.body;

    const prod = await Product.findById(productId);

    if (prod.quantity == 0) {
      return res.status(201).json({
        status: "failed",
        message: "Product not available",
      });
    }

    const updateCount = prod.quantity - 1;

    const product = await Product.findByIdAndUpdate(
      productId,
      { quantity: updateCount },
      {
        new: true,
        runValidators: true,
      },
    );

    res.status(200).json({
      status: "success",
      data: {
        product,
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
  getAllProduct,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  updateProductBuy,
};
