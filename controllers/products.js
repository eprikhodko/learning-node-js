const Product = require("../models/product");

exports.postAddProduct = (req, res, next) => {
  console.log("exports.postAddProduct, req.body:", req.body);

  const product = new Product(req.body.title);
  product.save();

  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  const products = Product.fetchAll();
  console.log("exports.getProducts log:", products);
  res.send(products);
};
