const express = require("express");
const router = express.Router();

const AdminRoute = require("./AdminRoute");
const CategoryRoute = require("./CategoryRoute");
const DashboardRoute = require("./DashboardRoute");
const FeatureRoute = require("./FeatureRoute");
const RegionRoute = require("./RegionRoute");
const MemberRoute = require("./MemberRoute");
const NotificationRoute = require("./NotificationRoute");
const OutletRoute = require("./OutletRoute");
const TransactionRoute = require("./TransactionRoute");
const VisitorRoute = require("./VisitorRoute");
const RegisterTransactionRoute = require("./RegisterTransactionRoute");
const BranchRoute = require("./BranchRoute");
const ReferralRoute = require("./ReferralRoute");
const ProductHistoryRoute = require("./ProductHistoryRoute");
const ProductRoute = require("./ProductRoute");
const UserFavorite = require("./UserFavoriteRoute");

router.use("/admin", AdminRoute);
router.use("/category", CategoryRoute);
router.use("/dashboard", DashboardRoute);
router.use("/feature", FeatureRoute);
router.use("/region", RegionRoute);
router.use("/member", MemberRoute);
router.use("/notification", NotificationRoute);
router.use("/outlet", OutletRoute);
router.use("/transaction", TransactionRoute);
router.use("/visitor", VisitorRoute);
router.use("/register-transaction", RegisterTransactionRoute);
router.use("/branch", BranchRoute);
router.use("/referral", ReferralRoute);
router.use("/product", ProductRoute);
router.use("/productHistory", ProductHistoryRoute);
router.use("/userFavorite", UserFavorite);

module.exports = router;
