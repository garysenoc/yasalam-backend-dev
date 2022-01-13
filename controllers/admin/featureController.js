const Feature = require("../../models/Feature");
const Outlet = require("../../models/Outlet");
const Branch = require("../../models/Branch");

const getAllFeature = async (req, res) => {
  try {
    const feature = await Feature.find();

    res.status(200).json({
      status: "success",
      results: feature.length,
      data: {
        feature,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const getFeature = async (req, res) => {
  // done
  try {
    const feature = await Feature.findById(req.params.id);
    //Tour.findOne({_id=req.params.id})
    res.status(200).json({
      status: "success",
      data: {
        feature,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const createFeature = async (req, res) => {
  try {
    const newFeature = await Feature.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        newFeature,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const deleteFeature = async (req, res) => {
  try {
    const feature = await Feature.findById(req.params.id);
    const noFeature = await Feature.findOne({ name: "No feature" });

    await Outlet.updateMany({ feature: feature }, { feature: noFeature._id });
    await Branch.updateMany({ feature: feature }, { feature: noFeature._id });

    await Feature.findByIdAndDelete(req.params.id);
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

const updateFeature = async (req, res) => {
  try {
    const feature = await Feature.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        feature,
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
  getAllFeature,
  getFeature,
  createFeature,
  deleteFeature,
  updateFeature,
};
