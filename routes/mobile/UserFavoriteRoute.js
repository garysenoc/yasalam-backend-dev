const router = require("express").Router();

const { UserFavoriteController } = require("../../controllers/mobile");

router.get("/", UserFavoriteController.getAllUserFavorite);
router.get("/:id", UserFavoriteController.getUserFavorite);

router.post(
  "/create-UserFavorite-history",
  UserFavoriteController.createUserFavorite,
);
router.post(
  "/delete-UserFavorite-history/",
  UserFavoriteController.deleteUserFavorite,
);

// getAllUserFavorite,
// getUserFavorite,
// createUserFavorite,
// deleteUserFavorite,

module.exports = router;
