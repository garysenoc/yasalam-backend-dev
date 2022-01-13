const router = require("express").Router()
const { CategoryController } = require('../../controllers/mobile')

router.get("/get-all-category",CategoryController.getAllCategory)

module.exports = router;