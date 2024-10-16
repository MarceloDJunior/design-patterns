// The Builder pattern is a creational design pattern that separates the construction 
// of a complex object from its representation. This separation enables the same 
// construction process to produce different representations of the object. 
// It is particularly useful for creating complex objects with multiple variations, 
// as it allows for a step-by-step construction process while maintaining the 
// internal state of the object. 
// The pattern typically involves a builder class that provides methods to set 
// various properties of the object, culminating in a build method that returns 
// the fully constructed object. This approach enhances code readability and 
// flexibility, making it easier to manage complex object creation.

// Key concepts:
// Separation of Concerns: Separates object construction from representation.
// Fluent Interface: Uses method chaining for clear and readable configuration.
// Step-by-Step Construction: Constructs objects incrementally for precise control.
// Final Build Method: Finalizes and returns the constructed object.

// Example of a builder class to create pizzas with different ingredients

class Pizza {
  private size: string;
  private cheese: boolean;
  private pepperoni: boolean;
  private mushrooms: boolean;
  private olives: boolean;

  constructor(builder: PizzaBuilder) {
    this.size = builder.size;
    this.cheese = builder.cheese;
    this.pepperoni = builder.pepperoni;
    this.mushrooms = builder.mushrooms;
    this.olives = builder.olives;
  }

  public displayDetails(): void {
    console.log(`Pizza Details:
          Size: ${this.size}
          Cheese: ${this.cheese ? "Yes" : "No"}
          Pepperoni: ${this.pepperoni ? "Yes" : "No"}
          Mushrooms: ${this.mushrooms ? "Yes" : "No"}
          Olives: ${this.olives ? "Yes" : "No"}
      `);
  }
}

class PizzaBuilder {
  public size: string; // e.g., "Small", "Medium", "Large"
  public cheese: boolean = false; // default value
  public pepperoni: boolean = false; // default value
  public mushrooms: boolean = false; // default value
  public olives: boolean = false; // default value

  constructor(size: string) {
    this.size = size;
  }

  public addCheese(): PizzaBuilder {
    this.cheese = true;
    return this;
  }

  public addPepperoni(): PizzaBuilder {
    this.pepperoni = true;
    return this;
  }

  public addMushrooms(): PizzaBuilder {
    this.mushrooms = true;
    return this;
  }

  public addOlives(): PizzaBuilder {
    this.olives = true;
    return this;
  }

  public build(): Pizza {
    return new Pizza(this);
  }
}

// Usage
const largePepperoniPizza = new PizzaBuilder("Large")
  .addCheese()
  .addPepperoni()
  .build();
largePepperoniPizza.displayDetails();

const smallCheesePizza = new PizzaBuilder("Small")
  .addCheese()
  .addOlives()
  .build();
smallCheesePizza.displayDetails()
