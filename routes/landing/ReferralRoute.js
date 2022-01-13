const router = require("express").Router()
const { ReferralController } = require('../../controllers/landing')


router.post("/confirm-referral",ReferralController.confirmReferral)


module.exports = router;