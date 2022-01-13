const router = require("express").Router();

const { UserController } = require("../../controllers/admin");

router.get("/:id", UserController.getUser);
router.get("/", UserController.getAllUser);
router.patch("/add-user-points", UserController.addUserPoints);
router.patch("/reset-otp", UserController.resetOTP);
router.patch("/:id", UserController.updateUser);
router.post("/", UserController.getAllUser);
router.post("/get-month-member", UserController.getpecificMonthYearUser);
router.post("/get-date-member", UserController.getSpecificDateUser);

// router.delete("/:id",UserController.deleteUser)
// router.post('/create-user', UserController.createUser);

module.exports = router;
