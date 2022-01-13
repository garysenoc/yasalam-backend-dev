const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");
const Outlet = require("../../models/Outlet");
const User = require("../../models/User");
const Booking = require("../../models/Transaction");
const Category = require("../../models/Category");
const Feature = require("../../models/Feature");
const Visitor = require("../../models/Visitor");
const Transaction = require("../../models/Transaction");
const RegisterTransaction = require("../../models/RegisterTransaction");
const Branch = require("../../models/Branch");
const Region = require("../../models/Region");

//count all categories by outlet
const getCategoryById = catchAsync(async (req, res, next) => {
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
});

//count all categories by outlet
const getCountCategoriesOutletBranch = catchAsync(async (req, res, next) => {
  const category = await Category.find();

  for (let i in category) {
    const count = await Outlet.count({ category: category[i]._id });
    category[i] = { category: category[i]._doc, count: count };
  }

  res.status(200).json({
    status: "success",
    data: {
      category,
    },
  });
});

//get all outlet
const getAllOutlet = catchAsync(async (req, res, next) => {
  const outlet = await Outlet.find({ havePromo: false })
    .select("name address category logo region")
    .populate("category", "name");

  res.status(200).json({
    status: "success",
    data: {
      outlet,
    },
  });
});

// fetch category

const getOnlyCategoryName = catchAsync(async (req, res, next) => {
  const category = await Category.find().select("name");

  res.status(200).json({
    status: "success",
    data: {
      category,
    },
  });
});

const getOutletAllDetails = catchAsync(async (req, res, next) => {
  var populateQuery = [
    { path: "category", select: "name" },
    { path: "feature" },
  ];

  const id = req.params.id;

  const outlet = await Outlet.findById(id).populate(populateQuery);

  res.status(200).json({
    status: "success",
    data: {
      outlet,
    },
  });
});

const getBranchesByOutletId = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const branch = await Branch.find({ outlet: id }).select(
    "-password -username",
  );

  res.status(200).json({
    status: "success",
    data: {
      branch,
    },
  });
});

const getOutletsByCategories = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const outlet = await Outlet.find({ category: id })
    .select("name address region logo")
    .populate("category", "name");

  res.status(200).json({
    status: "success",
    data: {
      outlet,
    },
  });
});

const getBranchPopulate = async (req, res) => {
  var populateQuery = [{ path: "category" }, { path: "feature" }];

  // done
  try {
    const branch = await Branch.findById(req.params.id).populate("outlet");
    const outlet = await Outlet.findById(branch.outlet.id).populate(
      populateQuery,
    );
    res.status(200).json({
      status: "success",
      data: {
        branch,
      },
      category: outlet.category,
      feature: outlet.feature,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const getLatLng = async (req, res) => {
  try {
    const main = await Outlet.findOne({ _id: req.params.id }).select(
      "name address longitude latitude",
    );
    const branch = await Branch.find({ outlet: req.params.id }).select(
      "name address longitude latitude",
    );

    res.status(200).json({
      status: "success",
      main,
      branch,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// get top 5 outlet
const getNewestOutlet = async (req, res) => {
  try {
    const outlet = await Outlet.find()
      .populate("category")
      .sort({ _id: -1 })
      .limit(5);

    res.status(200).json({
      status: "success",
      outlet,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const registerChildren = async (req, res) => {
  try {
    const outlet = await Outlet.find()
      .populate("category")
      .sort({ _id: -1 })
      .limit(5);

    res.status(200).json({
      status: "success",
      outlet,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const getAllOutletBranch = async (req, res) => {
  try {
    const outlet = await Outlet.find().select(
      "name address logo latitude longitude",
    );
    const branch = await Branch.find().select(
      "name address logo latitude longitude",
    );

    res.status(200).json({
      status: "success",
      outlet,
      branch,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const searchOutletFilter = async (req, res) => {
  try {
    const category = req.body.category;
    const region = req.body.region;
    const feature = req.body.feature;
    const text = req.body.text;

    const searchObj = {};

    if (category) {
      searchObj["category"] = category;
    }
    if (region) {
      searchObj["region"] = region;
    }
    if (feature) {
      searchObj["feature"] = feature;
    }

    if (text) {
      searchObj["name"] = { $regex: ".*" + text + ".*", $options: "i" };
    }

    const outlet = await Outlet.find({ ...searchObj, havePromo: false })
      .select("-password")
      .populate(["feature", "category"]);

    res.status(200).json({
      status: "success",
      results: outlet.length,
      data: {
        outlet,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

//get all outlet with discounts
const getAllOutletWithPromo = catchAsync(async (req, res, next) => {
  const outlet = await Outlet.find({ havePromo: true })
    .select("name address category logo region")
    .populate("category", "name");

  res.status(200).json({
    status: "success",
    data: {
      outlet,
    },
  });
});

//get all outlet logo
const getAllOutletLogo = catchAsync(async (req, res, next) => {
  const outlet = await Outlet.find().select("logo");

  res.status(200).json({
    status: "success",
    data: {
      outlet,
    },
  });
});

//get all outlet logo
const getAllCategoryFeatureRegion = catchAsync(async (req, res, next) => {
  const region = await Region.find();
  const feature = await Feature.find();
  const category = await Category.find();

  res.status(200).json({
    status: "success",
    data: {
      region,
      feature,
      category,
    },
  });
});

//get all outlet with promo
const getAllOutletPromo = catchAsync(async (req, res, next) => {
  const outlet = await Outlet.find({ havePromo: true })
    .select("-password")
    .populate(["feature", "category"]);

  res.status(200).json({
    status: "success",
    data: {
      outlet,
    },
  });
});

const searchOutletFilterWithPromo = async (req, res) => {
  try {
    const category = req.body.category;
    const region = req.body.region;
    const feature = req.body.feature;
    const text = req.body.text;

    const searchObj = {};

    if (category) {
      searchObj["category"] = category;
    }
    if (region) {
      searchObj["region"] = region;
    }
    if (feature) {
      searchObj["feature"] = feature;
    }

    if (text) {
      searchObj["name"] = { $regex: ".*" + text + ".*", $options: "i" };
    }

    const outlet = await Outlet.find({ ...searchObj, havePromo: true })
      .select("-password")
      .populate(["feature", "category"]);

    res.status(200).json({
      status: "success",
      results: outlet.length,
      data: {
        outlet,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

//get top 5 most visited outlet
const getTop5MostVisitedOutlet = catchAsync(async (req, res, next) => {
  const outlets = await Outlet.find()
    .select("-password")
    .populate(["feature", "category"])
    .sort("");

  for (let outlet in outlets) {
  }

  res.status(200).json({
    status: "success",
    data: {
      outlet,
    },
  });
});

const topNewestOutlet = async (req, res) => {
  var populateQuery = [
    { path: "category", select: "name" },
    { path: "feature", select: "name" },
  ];
  try {
    const outlet = await Outlet.find()
      .select("-password")
      .populate(populateQuery)
      .sort({ _id: -1 })
      .limit(5);

    res.status(200).json({
      status: "success",
      results: outlet.length,
      data: {
        outlet,
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
  getCategoryById,
  getCountCategoriesOutletBranch,
  getAllOutlet,
  getOnlyCategoryName,
  getOutletAllDetails,
  getBranchesByOutletId,
  getOutletsByCategories,
  getBranchPopulate,
  getLatLng,
  getNewestOutlet,
  getAllOutletBranch,
  searchOutletFilter,
  getAllOutletWithPromo,
  getAllOutletLogo,
  getAllCategoryFeatureRegion,
  searchOutletFilterWithPromo,
  getAllOutletPromo,
  topNewestOutlet,
  getAllCategoryYasalam,
};
