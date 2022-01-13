const router = require("express").Router()
const { ReferralController } = require('../../controllers/admin')


router.post("/generate-referral",ReferralController.generateReferral)
router.delete("/delete-referral",ReferralController.deleteReferral)
router.get("/get-all-referral",ReferralController.getAllReferral)
// router.patch("/:id",RegionController.updateRegion)
// router.post('/', RegionController.createRegion);


module.exports = router;