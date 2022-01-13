const router = require("express").Router()
const { CategoryController } = require('../../controllers/admin')


router.get("/:id",CategoryController.getCategory)
router.get("/",CategoryController.getAllCategory)
router.delete("/:id",CategoryController.deleteCategory)
router.patch("/:id",CategoryController.updateCategory)
router.post('/', CategoryController.createCategory);


module.exports = router;