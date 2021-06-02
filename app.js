const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = new express();

app.use(
  morgan(
    "Accessing :url with :method method. Sent status code :status in :response-time ms"
  )
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("views", "./views");
app.set("view engine", "pug");
app.use("/static", express.static("public"));

const productRoutes = require("./routes/productRoutes"),
  cartRoutes = require("./routes/cartRoutes"),
  adminRoutes = require("./routes/adminRoutes"),
  homeRoute = require("./routes/homeRoutes"),
  errorRoute = require("./routes/errorRoute");

app.use((req, res, next) => {
  UserModel.findById("60b510e7df47cb9448fb0fc3")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.error(err);
      next();
    });
});

app.use("/product", productRoutes);
app.use("/cart", cartRoutes);
app.use("/admin", adminRoutes);
app.use(homeRoute);
app.use(errorRoute);

module.exports = app;
