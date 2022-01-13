const router = require("express").Router()

const { OutletController } = require('../../controllers/admin')

router.get("/name-only",OutletController.getAllOutletNameOnly)
router.get("/:id",OutletController.getOutlet)
router.get("/",OutletController.getAllOutlet)
router.delete("/:id",OutletController.deleteOutlet)
router.patch("/:id",OutletController.updateOutlet)
router.patch("/update-outlet-password/:id",OutletController.updateOutletPassword)
router.post('/', OutletController.createOutlet);



module.exports = router;