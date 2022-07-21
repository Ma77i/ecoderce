// router
const router = require("express").Router();

// controllers
const controller = require("../controllers/order.controller");

const authJWT = require("../middlewares/jwt.middleware");

router.get("", controller.getAll);
router.post("/:id", authJWT, controller.save)
router.delete("/:id", controller.deleteOrder)

router.put("/:orderId", controller.updateSendOrder);

module.exports = router;
