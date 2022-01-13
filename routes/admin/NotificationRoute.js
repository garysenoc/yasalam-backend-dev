const router = require("express").Router()

const { NotificationController} = require('../../controllers/admin')


router.get("/",NotificationController.getAllNotification)
router.get("/:id",NotificationController.getNotification)
router.delete("/:id",NotificationController.deleteNotification)
router.post('/', NotificationController.createNotification);


module.exports = router;