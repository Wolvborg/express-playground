const router = require("express").Router();
const CartController = require("../controller/CartController");

router.get("/", CartController.getCart);

router.post("/add", CartController.addCart);

router.post("/delete", CartController.deleteCart);

module.exports = router;
