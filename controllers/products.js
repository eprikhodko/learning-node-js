const Product = require("../models/product");

exports.postAddProduct = (req, res, next) => {
  console.log("exports.postAddProduct, req.body:", req.body);

  const product = new Product(req.body.title);
  product.save();

  res.redirect("/");
};

/* 
the Product.fetchAll() function is called with a callback function as an argument. The callback function is called with the "products" array as an argument after the file has been read and the "products" array has been populated. The response is then sent back to the client using the res.send() function.

##### old version:
exports.getProducts = (req, res, next) => {
  const products = Product.fetchAll();
  console.log("exports.getProducts log:", products);
  res.send(products);
};

######## alternative version:
Alternatively, you can use the fs.promises.readFile() function and modify the Product.fetchAll() function as follows:

static async fetchAll() {
  const p = path.join(
    path.dirname(require.main.filename),
    "data",
    "products.json"
  );

  try {
    const fileData = await fs.promises.readFile(p);
    const products = JSON.parse(fileData);
    return products;
  } catch (err) {
    console.log("error:", err);
    return [];
  }
}
You can then use the modified Product.fetchAll() function in the following way:

exports.getProducts = async (req, res, next) => {
  const products = await Product.fetchAll();
  console.log("exports.getProducts log:", products);
  res.send(products);
};
In this example, the await keyword is used to wait for the Product.fetchAll() function to resolve before continuing the execution of the code. The resolved value (in this case, the "products" array) is then used to send the response back to the client using the res.send() function.
*/
exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    console.log("exports.getProducts log:", products);
    res.send(products);
  });
};
/* 
detailed explanation of how Product.fetchAll function work:

Here is a step-by-step explanation of how the code works, with more specific information about which callback function is being referred to at each step:

1. The exports.getProducts function is called when a GET request is made to the backend. This function is defined as follows:

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    console.log("exports.getProducts log:", products);
    res.send(products);
  });
};

In this function, the Product.fetchAll() function is called with a callback function as an argument. This callback function is defined as an anonymous function and takes a single argument, "products".

2. The Product.fetchAll() function is defined as follows:

static fetchAll(callback) {
  const p = path.join(
    path.dirname(require.main.filename),
    "data",
    "products.json"
  );

  let products = [];

  fs.readFile(p, (err, fileData) => {
    console.log("error:", err);
    if (err) {
      return callback([]);
    }

    products = JSON.parse(fileData);

    return callback(products);
  });
}
In this function, the fs.readFile() function is called to read the file. The fs.readFile() function is asynchronous, meaning that it does not block the execution of the rest of the code while it reads the file. Instead, it executes a callback function when the file has been read.

The callback function that is executed by the fs.readFile() function is defined as an anonymous function and takes two arguments, "err" and "fileData".

3. The fs.readFile() function starts reading the file and does not block the execution of the rest of the code.

4. The Product.fetchAll() function continues to execute and returns immediately.

5. When the file has been read, the callback function that was passed to the fs.readFile() function is executed with the "err" and "fileData" arguments. This callback function is defined as follows:

(err, fileData) => {
  console.log("error:", err);
  if (err) {
    return callback([]);
  }

  products = JSON.parse(fileData);

  return callback(products);
}

In this callback function, the "products" array is populated with the data from the file after it has been parsed. The "products" array is then passed to the callback() function, which is the callback function that was passed to the Product.fetchAll() function as an argument.

6. The callback function that was passed to the Product.fetchAll() function is executed with the "products" array as an argument. This callback function is defined as follows:

(products) => {
  console.log("exports.getProducts log:", products);
  res.send(products);
}

In this callback function, the response is sent back to the client with the "products" array as the data.

##############
how the Product.fetchAll(callbackFunction) is work?

In JavaScript, a callback is a function that is passed as an argument to another function and is executed after the outer function has completed. In the first example I provided, the Product.fetchAll() function takes a callback function as an argument and executes it after the file has been read and the "products" array has been populated.

The fs.readFile() function is asynchronous, meaning that it does not block the execution of the rest of the code while it reads the file. Instead, it executes a callback function when the file has been read. In this case, the callback function is responsible for sending the response back to the client with the data from the file.

Here is a simplified version of how the code works:

- The Product.fetchAll() function is called with a callback function as an argument.
- The fs.readFile() function is called to read the file.
- The fs.readFile() function starts reading the file and does not block the execution of the rest of the code.
- The Product.fetchAll() function continues to execute and returns immediately.
- When the file has been read, the callback function is executed with the data from the file as an argument.
- The callback function sends the response back to the client with the data from the file.

In this example, the callback function is defined in the exports.getProducts function and is passed as an argument to the Product.fetchAll() function. This allows the exports.getProducts function to send the response back to the client after the file has been read and the "products" array has been populated.
*/
