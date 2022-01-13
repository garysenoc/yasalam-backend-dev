const express = require('express')
const router  = express.Router()
const BranchRoute = require('./BranchRoute')

router.use('/branch', BranchRoute)

module.exports = router;