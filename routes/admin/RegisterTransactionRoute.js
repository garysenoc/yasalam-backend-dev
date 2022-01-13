const router = require("express").Router()

const { RegisterTransaction } = require('../../controllers/admin')

router.get("/:id",RegisterTransaction.getRegisterTransaction)
router.get("/",RegisterTransaction.getAllRegisterTransaction)
router.post("/",RegisterTransaction.getAllRegisterTransaction)
router.post("/get-month-register",RegisterTransaction.getpecificMonthYearRegisterTransaction)
router.post("/get-date-register",RegisterTransaction.getSpecificDateRegisterTransaction)

// router.delete("/delete-registerTransaction/:id",RegisterTransaction.deleteRegisterTransaction)
// router.patch("/update-registerTransaction/:id",RegisterTransaction.updateRegisterTransaction)
// router.post('/create-registerTransaction', RegisterTransaction.createRegisterTransaction);

module.exports = router;