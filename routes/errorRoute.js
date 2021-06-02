const router = require("express").Router();
const ErrorController = require("../controller/ErrorController");

router.use("/", ErrorController.render404);

module.exports = router;
