// router
const router = require("express").Router();

// controllers
const controller = require("../controllers/order.controller");

const authJWT = require("../middlewares/jwt.middleware");

router.get("", controller.getAllOrders);
router.post("/:id", authJWT, controller.saveOrder)
router.put("/:id", controller.updateSendOrder);
router.delete("/:id", controller.deleteOrder)
router.delete("", controller.deleteAllOrders)


module.exports = router;
