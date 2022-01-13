const router = require("express").Router()
const { AuthController } = require('../../controllers/branch/index')

// TEST ROUTE
router.get('/test', AuthController.test);

// CHECK IF LOGIN
router.get('/', AuthController.checkIfLogin);

// LOGIN
router.post('/login', AuthController.login);

// LOGOUT
router.get('/logout', AuthController.logout);

module.exports = router;