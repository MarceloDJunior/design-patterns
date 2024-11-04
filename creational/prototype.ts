// The Prototype pattern is a creational design pattern that allows for the cloning
// of existing objects to create new instances. Instead of creating new objects from scratch, 
// the Prototype pattern promotes the reuse of existing object structures, which can be 
// particularly useful when the cost of creating a new instance is high or when the configuration
// of an object is complex. This pattern typically involves a prototype interface that defines
// a method for cloning itself, allowing clients to create copies of the object without needing
// to understand the underlying details of its creation.

// Key Concepts:
// Object Cloning: Creates new objects by copying existing ones, reducing initialization overhead.
// Prototype Interface: Defines a clone method for duplicating objects.
// Encapsulation: Separates object creation logic from clients for dynamic management.
// Configuration Flexibility: Allows customization of cloned objects after creation.
// Performance Optimization: Minimizes resource-intensive object instantiation.

// Example of a prototype to clone shapes in a design tool

// Prototype interface
interface Shape {
  clone(): Shape; // Method to clone the object
  draw(): void; // Method to render the shape
}

// Concrete Prototype for Circle
class Circle implements Shape {
  constructor(private radius: number, private color: string) { }

  // Implement the clone method
  clone(): Circle {
    return new Circle(this.radius, this.color); // Return a new Circle with the same properties
  }

  setRadius(radius: number) {
    this.radius = radius;
  }

  setColor(color: string) {
    this.color = color;
  }

  public draw(): void {
    console.log(`Drawing a Circle with radius: ${this.radius} and color: ${this.color}`);
  }
}

// Concrete Prototype for Rectangle
class Rectangle implements Shape {
  constructor(private width: number, private height: number, private color: string) { }

  // Implement the clone method
  clone(): Rectangle {
    return new Rectangle(this.width, this.height, this.color); // Return a new Rectangle with the same properties
  }

  setWidth(width: number) {
    this.width = width;
  }

  setHeight(height: number) {
    this.height = height;
  }

  setColor(color: string) {
    this.color = color;
  }

  public draw(): void {
    console.log(`Drawing a Rectangle with width: ${this.width}, height: ${this.height}, and color: ${this.color}`);
  }
}

// Client code
const circle1 = new Circle(10, "red");
circle1.draw(); // Output: Drawing a Circle with radius: 10 and color: red

// Cloning and modifying the cloned Circle
const circle2 = circle1.clone();
circle2.setColor("blue");
circle2.draw(); // Output: Drawing a Circle with radius: 10 and color: blue

const rectangle1 = new Rectangle(20, 30, "green");
rectangle1.draw(); // Output: Drawing a Rectangle with width: 20, height: 30, and color: green

// Cloning and modifying the cloned Rectangle
const rectangle2 = rectangle1.clone();
rectangle2.setWidth(25);
rectangle2.setColor("yellow");
rectangle2.draw(); // Output: Drawing a Rectangle with width: 25, height: 30, and color: yellow
