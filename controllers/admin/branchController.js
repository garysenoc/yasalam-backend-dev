const Branch = require("../../models/Branch");
const Outlet = require("../../models/Outlet");
const bcrypt = require("bcryptjs");

const getAllBranch = async (req, res) => {
  try {
    const branch = await Branch.find().populate("outlet");

    res.status(200).json({
      status: "success",
      results: branch.length,
      data: {
        branch,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const getBranch = async (req, res) => {
  // done
  try {
    const branch = await Branch.findById(req.params.id).populate("outlet");
    const outlet = await Outlet.findById(branch.outlet.id).populate("category");
    //Tour.findOne({_id=req.params.id})
    res.status(200).json({
      status: "success",
      data: {
        branch,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const createBranch = async (req, res) => {
  try {
    const { password } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newBranch = await Branch.create({
      ...req.body,
      password: passwordHash,
    });

    res.status(201).json({
      status: "success",
      data: {
        newBranch,
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

const deleteBranch = async (req, res) => {
  try {
    await Branch.findByIdAndDelete(req.params.id);
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

const updateBranch = async (req, res) => {
  try {
    const branch = await Branch.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        branch,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const getBranchOutletName = async (req, res) => {
  try {
    const branch = await Branch.find()
      .select("-password")
      .populate("outlet", "name");

    res.status(200).json({
      status: "success",
      results: branch.length,
      data: {
        branch,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const getBranchByOutlet = async (req, res) => {
  // done
  try {
    const branch = await Branch.find({ outlet: req.params.id });

    //Tour.findOne({_id=req.params.id})
    res.status(200).json({
      status: "success",
      data: {
        branch,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const getBranchPopulate = async (req, res) => {
  // done
  try {
    const branch = await Branch.findById(req.params.id).populate("outlet");
    const branch_category = await Outlet.findById(branch.outlet.id).populate(
      "category",
    );
    //Tour.findOne({_id=req.params.id})
    res.status(200).json({
      status: "success",
      data: {
        branch,
      },
      category: branch_category.category,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const updateBranchPassword = async (req, res) => {
  try {
    const branch = await Branch.findById(req.params.id);

    const { password } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newBranch = await Branch.findByIdAndUpdate(
      branch._id,
      { password: passwordHash },
      { new: true },
    );

    res.status(200).json({
      status: "success",
      data: {
        newBranch,
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
  getAllBranch,
  getBranch,
  createBranch,
  deleteBranch,
  updateBranch,
  getBranchOutletName,
  getBranchByOutlet,
  getBranchByOutlet,
  getBranchPopulate,
  updateBranchPassword,
};
