// The Chain of Responsibility pattern is a behavioral design pattern that allows a request to be passed 
// along a chain of handlers. Each handler in the chain can either process the request or pass it along 
// to the next handler. This pattern is particularly useful for scenarios where multiple objects can handle 
// a request, but the exact handler is not known a priori.

// Key Concepts
// Handler: Defines an interface for handling requests and may implement a method to set the next handler in the chain.
// Concrete Handlers: Implement the handling logic and decide whether to process the request or pass it to the next handler.
// Client: Initiates the request, typically by invoking a method on the first handler in the chain.

// Benefits
// Decoupling: It decouples the sender of a request from its receivers.
// Flexibility: New handlers can be added or existing handlers can be modified without changing the client code.
// Single Responsibility: Each handler has a single responsibility, improving maintainability.

// Example of a chain of responsibility implementation for an order processing system.

// Define the Order Class
class Order {
    constructor(
        public orderId: number,
        public items: { itemId: number; quantity: number }[],
        public user: string,
        public totalAmount: number
    ) {}
}

// Define the Handler Interface
interface Handler {
    setNext(handler: Handler): Handler;
    handle(order: Order): void; // Return a message or null if not handled
}

// Define the custom error class
class OrderProcessingError extends Error {
  constructor(message: string) {
      super(message);
      this.name = "OrderProcessingError";
  }
}

// Create Concrete Handlers
class OrderValidationHandler implements Handler {
  private nextHandler: Handler | null = null;

  setNext(handler: Handler): Handler {
      this.nextHandler = handler;
      return handler;
  }

  handle(order: Order): void {
      // Validate order details
      if (order.items.length === 0) {
          throw new OrderProcessingError('Order validation failed: No items in the order.');
      }
      // Additional validation logic can be added here
      console.log('Order validated.');
      if (this.nextHandler) {
          this.nextHandler.handle(order);
      }
  }
}

class InventoryCheckHandler implements Handler {
  private nextHandler: Handler | null = null;

  setNext(handler: Handler): Handler {
      this.nextHandler = handler;
      return handler;
  }

  handle(order: Order): void {
      // Check inventory for each item in the order
      const inventory: { [key: number]: number } = { 1: 10, 2: 5 }; // Example inventory
      for (const item of order.items) {
          if (!inventory[item.itemId] || inventory[item.itemId] < item.quantity) {
              throw new OrderProcessingError(`Inventory check failed: Item ${item.itemId} is out of stock.`);
          }
      }
      console.log('Inventory checked and available.');
      if (this.nextHandler) {
          this.nextHandler.handle(order);
      }
  }
}

class PaymentProcessingHandler implements Handler {
  private nextHandler: Handler | null = null;

  setNext(handler: Handler): Handler {
      this.nextHandler = handler;
      return handler;
  }

  handle(order: Order): void {
      // Simulate payment processing
      const paymentSuccess = true;
      if (!paymentSuccess) {
          throw new OrderProcessingError('Payment processing failed: Insufficient funds.');
      }
      console.log('Payment processed successfully.');
      if (this.nextHandler) {
          this.nextHandler.handle(order);
      }
  }
}

class OrderConfirmationHandler implements Handler {
  private nextHandler: Handler | null = null;

  setNext(handler: Handler): Handler {
      this.nextHandler = handler;
      return handler;
  }

  handle(order: Order): void {
      // Simulate sending order confirmation
      console.log(`Order ${order.orderId} confirmed and sent to ${order.user}.`);
  }
}

// Set Up the Chain of Handlers
// Client code to set up the chain and make requests

const orderValidationHandler = new OrderValidationHandler();
const inventoryCheckHandler = new InventoryCheckHandler();
const paymentProcessingHandler = new PaymentProcessingHandler();
const orderConfirmationHandler = new OrderConfirmationHandler();

// Setting up the chain: Validation -> Inventory Check -> Payment Processing -> Confirmation
orderValidationHandler
    .setNext(inventoryCheckHandler)
    .setNext(paymentProcessingHandler)
    .setNext(orderConfirmationHandler);

// Example order
const order = new Order(1, [{ itemId: 1, quantity: 2 }, { itemId: 2, quantity: 1 }], 'Alice', 100);

// Process the order through the chain
try {
    orderValidationHandler.handle(order);
    console.log('Order processed successfully!'); // If no exception, order was successful
} catch (error) {
    if (error instanceof OrderProcessingError) {
        console.error('Error processing order:', error.message);
    } else {
        console.error('An unexpected error occurred:', error);
    }
}