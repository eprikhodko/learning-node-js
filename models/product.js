const products = [];

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    products.push(this);
  }

  static fetchAll() {
    return products;
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
