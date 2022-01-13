const Region = require("../../models/Region");
const Outlet = require("../../models/Outlet");
const Branch = require("../../models/Branch");

const getAllRegion = async (req, res) => {
  try {
    const region = await Region.find();

    res.status(200).json({
      status: "success",
      results: region.length,
      data: {
        region,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const getRegion = async (req, res) => {
  try {
    const region = await Region.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        region,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const createRegion = async (req, res) => {
  try {
    const newRegion = await Region.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        newRegion,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const deleteRegion = async (req, res) => {
  try {
    const region = await Region.findById(req.params.id);

    await Outlet.updateMany({ region: region.name }, { region: "no region" });
    await Branch.updateMany({ region: region.name }, { region: "no region" });

    await Region.findByIdAndDelete(req.params.id);

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

const updateRegion = async (req, res) => {
  try {
    const region = await Region.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        region,
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
  getAllRegion,
  getRegion,
  createRegion,
  deleteRegion,
  updateRegion,
};
