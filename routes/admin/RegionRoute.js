const router = require("express").Router()
const { RegionController } = require('../../controllers/admin')


router.get("/:id",RegionController.getRegion)
router.get("/",RegionController.getAllRegion)
router.delete("/:id",RegionController.deleteRegion)
router.patch("/:id",RegionController.updateRegion)
router.post('/', RegionController.createRegion);


module.exports = router;