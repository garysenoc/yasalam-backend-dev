const router = require("express").Router()

const { AuthController } = require('../../controllers/admin')

// CHECK IF LOGIN
router.get('/check-if-login', AuthController.checkIfLogin);

// TEST ROUTE
router.get('/test', AuthController.test);

// LOGOUT
router.get('/logout', AuthController.logout);

// LOGIN
router.post('/login', AuthController.login);




module.exports = router;