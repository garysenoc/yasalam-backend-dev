const router = require("express").Router()
const { NotificationController } = require('../../controllers/mobile')

router.get("/get-all-notification",NotificationController.getAllNotification)
router.post("/update-notification-token/:id",NotificationController.updateNotificationToken)


module.exports = router;