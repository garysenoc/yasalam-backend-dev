const router = require("express").Router();

const { ProductHistoryController } = require("../../controllers/mobile");

router.get("/", ProductHistoryController.getAllProductHistory);
router.get("/:id", ProductHistoryController.getProductHistory);
router.post(
  "/get-product-history-user",
  ProductHistoryController.getProductHistoryByUser,
);
router.post(
  "/create-product-history",
  ProductHistoryController.createProductHistory,
);
router.post(
  "/delete-product-history/:id",
  ProductHistoryController.deleteProductHistory,
);
router.post(
  "/update-product-history/:id",
  ProductHistoryController.updateProductHistory,
);

// getAllProductHistoryController,
// getProductHistoryController,
// createProductHistoryController,
// deleteProductHistoryController,
// updateProductHistoryController,
// getProductHistoryControllerByUser,
// updateProductHistoryControllerClaim,

module.exports = router;
