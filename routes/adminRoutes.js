const router = require("express").Router();
const AdminController = require("../controller/AdminController");
const ErrorController = require("../controller/ErrorController");

router.get("/", AdminController.getAllProducts);

router.get("/add-product", AdminController.getAddProduct);

router.post("/add-product", AdminController.postAddProduct);

router.get("/edit-product/:id", AdminController.getProductByID);

router.post("/edit-product", AdminController.postEditProduct);

router.post("/delete", AdminController.deleteProduct);

router.post("/", ErrorController.sendNotAllowed);

module.exports = router;
