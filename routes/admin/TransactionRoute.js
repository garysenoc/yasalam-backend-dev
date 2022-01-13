const router = require("express").Router()

const { TransactionController } = require('../../controllers/admin')


router.get("/:id",TransactionController.getTransaction)
router.get("/",TransactionController.getAllTransaction);
router.post("/",TransactionController.getAllTransaction);
router.post("/get-month-transaction",TransactionController.getpecificMonthYearTransaction);
router.post("/get-date-transaction",TransactionController.getSpecificDateTransaction);

// router.patch("/:id",TransactionController.updateTransaction);
// router.post('/', TransactionController.createTransaction);
// router.delete("/delete-transaction/:id",TransactionController.deleteTransaction);

module.exports = router;