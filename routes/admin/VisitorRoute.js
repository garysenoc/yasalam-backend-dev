
const router = require("express").Router()
const { VisitorController } = require('../../controllers/admin')

router.get("/:id",VisitorController.getVisitor)
router.get("/",VisitorController.getAllVisitor)
router.post("/",VisitorController.getAllVisitor)

router.post("/get-month-visitor",VisitorController.getpecificMonthYearVisitor)
router.post("/get-date-visitor",VisitorController.getSpecificDateVisitor)


// router.patch("/:id",VisitorController.deleteVisitor)
// router.post('/', VisitorController.updateVisitor);
// router.delete("/delete-visitor/:id",VisitorController.createVisitor)

module.exports = router;
