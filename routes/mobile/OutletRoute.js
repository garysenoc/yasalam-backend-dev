const router = require("express").Router()
const { OutletController } = require('../../controllers/mobile')


router.get('/test', OutletController.test);
router.get("/outlet-info-with-live-tracker",OutletController.outletLiveTracker)
router.get("/single-outlet-info-with-live-tracker/:id",OutletController.outletSingleLiveTracker)
router.get("/top-newest-outlet",OutletController.topNewestOutlet)
router.get("/get-outlet-experience",OutletController.getOutletExperience)
router.get("/get-outlet-by-category/:id",OutletController.getOutletByCategory)
router.post("/search-outlet-filter",OutletController.searchOutletFilter)

module.exports = router;