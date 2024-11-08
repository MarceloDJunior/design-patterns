// The Adapter Pattern is a structural design pattern that allows objects with incompatible 
// interfaces to work together. It acts as a bridge between two incompatible interfaces, enabling 
// them to communicate without changing their existing code. It is particularly useful in scenarios 
// where you want to decouple your application from external interfaces or vendors. 
// This decoupling allows you to change or replace external services (such as payment processors, 
// database systems, or APIs) without affecting the core functionality of your application.

// Key Concepts:
// Target: The interface that the client expects to interact with.
// Adaptee: The existing interface that needs to be adapted.
// Adapter: The class that implements the target interface and translates the calls to the adaptee’s methods.

// Example of an adapter class to integrate an external payment system

// Target interface
interface PaymentProcessor {
  pay(amount: number): void;
}

// Adaptee 1: PayPal payment gateway with a different method
class PayPalPayment {
  public completePayment(amount: number): void {
      console.log(`Processing payment of $${amount} through PayPal.`);
  }
}

// Adaptee 2: Stripe payment gateway with a different method
class StripePayment {
  public charge(amount: number): void {
      console.log(`Charging $${amount} through Stripe.`);
  }
}

// Adapter 1: Paypal adapter
class PayPalAdapter implements PaymentProcessor {
  private paypalPayment: PayPalPayment;

  constructor(paypalPayment: PayPalPayment) {
      this.paypalPayment = paypalPayment;
  }

  public pay(amount: number): void {
      this.paypalPayment.completePayment(amount);
  }
}

// Adapter 2: Stripe adapter
class StripeAdapter implements PaymentProcessor {
  private stripePayment: StripePayment;

  constructor(stripePayment: StripePayment) {
      this.stripePayment = stripePayment;
  }

  public pay(amount: number): void {
      this.stripePayment.charge(amount);
  }
}

// Client code to process payments
function processPayment(processor: PaymentProcessor, amount: number): void {
  processor.pay(amount);
}

// Using PayPal
const paypalPayment = new PayPalPayment();
const paypalAdapter: PaymentProcessor = new PayPalAdapter(paypalPayment);

// Process a payment using PayPal
processPayment(paypalAdapter, 150);

// Switching to Stripe
const stripePayment = new StripePayment();
const stripeAdapter: PaymentProcessor = new StripeAdapter(stripePayment);

// Process a payment using Stripe
processPayment(stripeAdapter, 200);