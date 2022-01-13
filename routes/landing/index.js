const express = require("express");
const router = express.Router();
const OutletRoute = require("./OutletRoute");
const AuthRoute = require("./AuthRoute");
const RegisterTransactionRoutes = require("./RegisterTransactionRoutes");
const ReferralRoute = require("./ReferralRoute");

router.get("/", (req, res) => {
  res.send("test");
});
router.use("/outlet", OutletRoute);
router.use("/auth", AuthRoute);
router.use("/registertransaction", RegisterTransactionRoutes);
router.use("/referral", ReferralRoute);
module.exports = router;
