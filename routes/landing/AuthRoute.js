const router = require("express").Router();
const { AuthController } = require("../../controllers/landing/index");
const cors = require("cors");

router.get("/test", AuthController.test);

router.post("/checkuser", AuthController.checkUser);

router.post("/resend-otp", AuthController.resendOTP);

router.post("/resend-email", AuthController.resendEmail);

router.post("/createuser", AuthController.createUser);

router.post("/updatePaidUser", cors(), AuthController.updatePaidUser);

router.get("/check-user-paid/:id", AuthController.checkIfPaid);

router.get("/get-user-type/:id", AuthController.getUserType);

router.get("/get-user-name", AuthController.getUserName);

module.exports = router;
