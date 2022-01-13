const router = require("express").Router()
const { RegisterTransactionController } = require('../../controllers/landing/index')

router.get('/test', RegisterTransactionController.test);

router.post('/', RegisterTransactionController.createRegisterTransaction);

module.exports = router;