
const router = require("express").Router()
const { BranchController } = require('../../controllers/admin')


router.get("/:id",BranchController.getBranch)
router.get("/",BranchController.getAllBranch)
router.delete("/:id",BranchController.deleteBranch)
router.patch("/:id",BranchController.updateBranch)
router.patch("/update-branch-password/:id",BranchController.updateBranchPassword)
router.post('/', BranchController.createBranch);
router.get("/get-branch-by-outlet/:id",BranchController.getBranchByOutlet)
router.get("/get-branch-outlet-name",BranchController.getBranchOutletName)
router.get("/get-branch-populate",BranchController.getBranchPopulate)




module.exports = router;
