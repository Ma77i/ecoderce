const router = require("express").Router();

const controller = require("../controllers/chat.controller");

router.get("", controller.getAll);
router.post("", controller.createText);
router.get("/:id", controller.getById);
router.delete("/:id", controller.deleteById);
router.delete("", controller.deleteAll);

module.exports = router;
