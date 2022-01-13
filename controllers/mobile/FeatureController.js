const Feature = require("../../models/Feature");

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

module.exports = {
  getAllFeature,
}