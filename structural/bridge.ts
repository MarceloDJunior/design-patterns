// The Bridge Pattern is a structural design pattern that separates an abstraction from 
// its implementation, allowing them to vary independently. This pattern is especially 
// useful when both the abstraction and the implementation may change or evolve over time.

// Key Concepts:
// Abstraction: This is the high-level interface that defines the abstraction and contains a reference to the implementation.
// Refined Abstraction: A subclass of the Abstraction that extends its behavior.
// Implementor: An interface that defines the low-level implementation. It is separate from the Abstraction.
// Concrete Implementor: Specific implementations of the Implementor interface.

// Example of a bridge implementation for a drawing application

// Implementor Interface
interface Color {
  applyColor(): void;
}

// Concrete Implementor: Red color
class Red implements Color {
  public applyColor(): void {
      console.log("Applying red color.");
  }
}

// Concrete Implementor: Green color
class Green implements Color {
  public applyColor(): void {
      console.log("Applying green color.");
  }
}

// Concrete Implementor: Blue color
class Blue implements Color {
  public applyColor(): void {
      console.log("Applying blue color.");
  }
}

// Abstraction Class
abstract class Shape {
  protected color: Color;

  constructor(color: Color) {
      this.color = color;
  }

  abstract draw(): void;
}

// Refined Abstraction: Circle
class Circle extends Shape {
  public draw(): void {
      console.log("Drawing a circle.");
      this.color.applyColor();
  }
}

// Refined Abstraction: Square
class Square extends Shape {
  public draw(): void {
      console.log("Drawing a square.");
      this.color.applyColor();
  }
}

function main() {
  const red = new Red();
  const green = new Green();

  const circle = new Circle(red);
  const square = new Square(green);

  circle.draw(); // Output: Drawing a circle. Applying red color.
  square.draw(); // Output: Drawing a square. Applying green color.

  // Change the color at runtime
  const blue = new Blue();
  const blueSquare = new Square(blue);
  blueSquare.draw(); // Output: Drawing a square. Applying blue color.
}

main();