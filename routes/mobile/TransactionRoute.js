const router = require("express").Router()
const { TransactionController } = require('../../controllers/mobile')

router.get("/get-all-transaction/:id",TransactionController.getTransaction)

module.exports = router;