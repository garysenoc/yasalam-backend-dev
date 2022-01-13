const router = require("express").Router()

const { FeatureController } = require('../../controllers/admin')


router.get("/:id",FeatureController.getFeature)
router.get("/",FeatureController.getAllFeature);
router.delete("/:id",FeatureController.deleteFeature);
router.patch("/:id",FeatureController.updateFeature);
router.post('/', FeatureController.createFeature);


module.exports = router;