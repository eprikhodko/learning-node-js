const fs = require("fs");
const path = require("path");

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    const p = path.join(
      path.dirname(require.main.filename),
      "data",
      "products.json"
    );
    // read products.json file from the "data" folder: /data/products.json
    // we're will have either error or data from the file
    fs.readFile(p, (err, fileData) => {
      // console.log("file data:", fileData);
      // we'll have either empty array, or array that we'll get from the file
      let products = [];
      if (!err) {
        // convert json string data from fileData to the javascript object
        products = JSON.parse(fileData);
      }
      // in any way, push to the array this. this – is an object that we're creating in the constructor
      // pay attention that we're using arrow function here, so "this" will refer to the object
      // not sure though if this still true
      products.push(this);
      console.log("this from the arrow function:", this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  /* 
  the "callback" parameter is a function that you can use to send the response back to the client after the file has been read and the "products" array has been populated.
  */

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
};

/* 
In programming, a class is a blueprint for creating objects. It defines the properties and behaviors that will be shared by all objects created from the class.

An instance of a class is a specific object that has been created from a class. You can think of a class as a factory for creating objects, and each object created from the class is an instance of that class.

For example, consider the following class definition:

class Dog {
  constructor(name, breed) {
    this.name = name;
    this.breed = breed;
  }

  bark() {
    console.log(`Woof! My name is ${this.name} and I'm a ${this.breed}!`);
  }
}
This Dog class has a constructor function that takes two arguments: name and breed. It also has a bark method that logs a string to the console.

To create an instance of the Dog class, you would use the new keyword:

const fido = new Dog('Fido', 'Labrador');
fido.bark(); // Outputs "Woof! My name is Fido and I'm a Labrador!"

const spot = new Dog('Spot', 'Poodle');
spot.bark(); // Outputs "Woof! My name is Spot and I'm a Poodle!"
In this example, fido and spot are both instances of the Dog class. They each have their own name and breed properties and can use the bark method inherited from the class.
*/
