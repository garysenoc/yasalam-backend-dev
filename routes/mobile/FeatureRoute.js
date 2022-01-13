const router = require("express").Router()

const { FeatureController } = require('../../controllers/admin')


router.get("/",FeatureController.getAllFeature);


module.exports = router;