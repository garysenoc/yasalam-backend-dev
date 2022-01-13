const router = require("express").Router()

const { UserController } = require('../../controllers/mobile')

router.post('/create-user', UserController.createUser);
router.post("/check-login-user",UserController.checkLoginUser)
router.post("/check-otp-verify",UserController.checkOTPVerify)
router.post("/",UserController.getUser)

router.get("/check-expiry-user/:id",UserController.checkExpirationUser)

router.post("/add-children-account",UserController.addChildrenAccount)
router.get("/get-spouse-by-id/:id",UserController.getSpouseById)




module.exports = router;