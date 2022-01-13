const router = require("express").Router()

const { TotalController } = require('../../controllers/admin')

router.get("/get-all-total", TotalController.getAllTotal);
router.get("/get-categories", TotalController.getCategories);
router.get("/outlets-stats-info", TotalController.outletsStatsInfo)
router.get("/outlet-stats/:id", TotalController.getIndividualOutletStats)
router.get("/outlet-branch-stats/:id",TotalController. getBranchOutletStats)
router.get("/outlet-overall-stats", TotalController.getOverallOutletStats)
router.get('/customer-stats/:id', TotalController.getIndividualCustomerStats)
router.get("/outlet-stats-customer", TotalController.outletStatsCustomer)
router.get('/customer-overall-stats', TotalController.getOverAllCustomerStats)
router.get("/outlet-total-live-tracker", TotalController.totalOutletLiveTracker)
router.get("/branch-total-live-tracker", TotalController.totalBranchLiveTracker)

router.get("/get-specific-month-year-visitor-outlet", TotalController.getpecificMonthYearVisitorOutlet)
router.get("/get-specific-date-visitor-outlet", TotalController.getSpecificDateVisitorOutlet)
router.get("/get-specific-month-year-transaction-outlet", TotalController.getpecificMonthYearTransactionOutlet)
router.get("/get-specific-date-transaction-outlet", TotalController.getSpecificDateTransactionOutlet)
router.get("/get-specific-month-year-user-outlet", TotalController.getpecificMonthYearUserOutlet)
router.get("/get-specific-date-user-outlet", TotalController.getSpecificDateUserOutlet)
router.get("/get-specific-month-year-register-transaction-outlet", TotalController.getpecificMonthYearRegisterTransactionOutlet)
router.get("/get-specific-date-register-transaction-outlet", TotalController.getSpecificDateRegisterTransactionOutlet)




module.exports = router;