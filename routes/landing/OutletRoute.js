const router = require("express").Router();
const { totalController } = require("../../controllers/landing");

router.get("get-all-outlet-and-branch", totalController.getAllOutletBranch);

router.get("/category/:id", totalController.getCategoryById);
router.get(
  "/get-count-categories-outlet-branch",
  totalController.getCountCategoriesOutletBranch,
);
router.get("/get-all-outlet", totalController.getAllOutlet);
router.get("/get-all-category-name", totalController.getOnlyCategoryName);
router.get("/get-outlet-details/:id", totalController.getOutletAllDetails);
router.get("/get-branch/:id", totalController.getBranchesByOutletId);
router.get(
  "/get-outlets-by-category/:id",
  totalController.getOutletsByCategories,
);
router.get("/get-top-5-new-outlet", totalController.getNewestOutlet);
router.get("/get-outlet-with-promo", totalController.getAllOutletWithPromo);
router.get("/get-outlet-logo", totalController.getAllOutletLogo);
router.get(
  "/get-feature-category-region",
  totalController.getAllCategoryFeatureRegion,
);
router.get("/get-outlet-promo", totalController.getAllOutletPromo);
router.get("/top-5-newest-outlet", totalController.topNewestOutlet);
router.get("/get-all-category-yasalam", totalController.getAllCategoryYasalam);

router.post("/search-outlet-filter", totalController.searchOutletFilter);
router.post(
  "/search-outlet-filter-promo",
  totalController.searchOutletFilterWithPromo,
);

router.get("/branch/:id", totalController.getBranchPopulate);
router.get("/get-lat-lng/:id", totalController.getLatLng);

module.exports = router;
