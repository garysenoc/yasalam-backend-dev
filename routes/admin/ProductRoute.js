const router = require("express").Router();

const { ProductController } = require("../../controllers/mobile");

router.get("/", ProductController.getAllProduct);
router.get("/:id", ProductController.getProduct);

router.post("/create-product", ProductController.createProduct);
router.post("/delete-product/:id", ProductController.deleteProduct);
router.post("/update-product/:id", ProductController.updateProduct);
router.post("/update-product-history-buy", ProductController.updateProductBuy);

// getAllProduct,
// getProduct,
// createProduct,
// deleteProduct,
// updateProduct,
// updateProductBuy,

module.exports = router;
