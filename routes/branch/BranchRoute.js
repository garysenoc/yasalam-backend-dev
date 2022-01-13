const router = require("express").Router()
const { totalController } = require('../../controllers/branch/index')


router.get('/get-recent-transactions', totalController.getRecentTransactions);
router.get('/get-recent-visitors', totalController.getRecentVisitors);
router.get('/get-stats-outlet', totalController.getStatsOutlet);
router.get('/get-outlet-transactions', totalController.getOutletTransactions);
router.post('/get-outlet-transactions', totalController.getOutletTransactions);
router.get('/get-outlet-visitors', totalController.getOutletVisitors);
router.post('/get-outlet-visitors', totalController.getOutletVisitors);
router.get('/get-visitor-qr', totalController.getVisitorQR);
router.get('/get-outlet-qr', totalController.getTransactionQR);
router.post('/post-visitors', totalController.postVisitorQR);
router.post('/post-transaction', totalController.postTransactionQR);
router.get('/check-user/:id', totalController.checkUser);
router.post('/get-specific-month-year-transaction', totalController.getpecificMonthYearTransaction);
router.post('/get-specific-date-transaction', totalController.getSpecificDateTransaction);
router.post('/get-specific-month-year-visitor', totalController.getpecificMonthYearVisitor);
router.post('/get-specific-date-visitor', totalController.getSpecificDateVisitor);

module.exports = router;