const router = require("express").Router()
const { VisitorController } = require('../../controllers/mobile')

router.get("/get-all-visit/:id",VisitorController.getVisitor)

module.exports = router;