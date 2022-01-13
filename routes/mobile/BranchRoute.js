const router = require("express").Router()
const { BranchController } = require('./../../controllers/mobile')

router.get("/branch-info-with-live-tracker",BranchController.branchLiveTracker)
router.get("/get-branches-by-outlet/:id",BranchController.getBranchesByOutletId)
router.get("/get-branch/:id",BranchController.getBranch)

module.exports = router;