const products = [];

exports.getAddProduct = (req, res, next) => {
  console.log(req.body);
  products.push({ title: req.body.title });
  //   console.log(products);
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  console.log(products);
  res.send(products);
};
