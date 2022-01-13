const router = require("express").Router();

const { AdminController } = require("../../controllers/admin");

// TEST ROUTE
router.get("/test", AdminController.test);

// GET SINGLE ADMIN
router.get("/:id", AdminController.getAdmin);

// GET ALL ADMIN
router.get("/", AdminController.getAllAdmin);

// CREATE ADMIN ACCOUNT
router.post("/", AdminController.createAdmin);

// DELETE ADMIN ACCOUNT
router.delete("/:id", AdminController.deleteAdmin);

//UPDATE ADMIN ACCOUNT
router.patch("/change-password", AdminController.changeAdminPassword);

router.patch("/:id", AdminController.updateAdmin);

module.exports = router;
