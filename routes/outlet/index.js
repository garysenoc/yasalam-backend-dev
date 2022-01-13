const express = require('express')
const router  = express.Router()
const OutletRoute = require('./OutletRoute')

router.use('/outlet', OutletRoute)

module.exports = router;