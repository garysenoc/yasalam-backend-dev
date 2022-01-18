const express = require("express");
const router = express.Router();
const OutletRoute = require("./OutletRoute");
const UserRoute = require("./UserRoute");
const BranchRoute = require("./BranchRoute");
const NotificationRoute = require("./NotificationRoute");
const VisitorRoute = require("./VisitorRoute");
const TransactionRoute = require("./TransactionRoute");
const CategoryRoute = require("./CategoryRoute");
const FeatureRoute = require("./FeatureRoute");
const ProductHistoryRoute = require("./ProductHistoryRoute");
const ProductRoute = require("./ProductRoute");
const UserFavorite = require("./UserFavoriteRoute");

router.use("/outlet", OutletRoute);
router.use("/user", UserRoute);
router.use("/branch", BranchRoute);
router.use("/notification", NotificationRoute);
router.use("/visit", VisitorRoute);
router.use("/transaction", TransactionRoute);
router.use("/category", CategoryRoute);
router.use("/feature", FeatureRoute);
router.use("/product", ProductRoute);
router.use("/productHistory", ProductHistoryRoute);
router.use("/userFavorite", UserFavorite);

module.exports = router;
