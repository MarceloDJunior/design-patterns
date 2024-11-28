// The Decorator Design Pattern is a structural design pattern that allows behavior 
// to be added to individual objects, either statically or dynamically, without affecting 
// the behavior of other objects from the same class. This pattern is particularly useful 
// for adhering to the Single Responsibility Principle by allowing functionality to be 
// divided among classes with unique areas of concern.

// Key concepts:
// Component Interface: This defines the interface for objects that can have responsibilities added to them.
// Concrete Component: This is a class that implements the component interface. It defines the default behavior.
// Decorator Base Class: This class also implements the component interface and contains a reference to a component object.
// It delegates the behavior to the wrapped component.
// Concrete Decorators: These are classes that extend the decorator base class. They add additional responsibilities or behaviors to the component.

// Core characteristics:
// Wrapping Behavior: Each decorator wraps an existing object, enhancing its functionality without 
// modifying the original object's structure. This wrapping allows decorators to be stacked, 
// resulting in dynamic combinations of behaviors.
// Dynamic Behavior Addition: Decorators enable the addition of responsibilities to objects at runtime, 
// providing flexibility in how behaviors can be combined and applied.
// Adherence to the Interface: Both the original object and the decorators implement the same interface, 
// allowing clients to treat decorated and undecorated objects uniformly. This promotes the Open/Closed Principle, 
// which states that software entities should be open for extension but closed for modification.

// Example of a Decorator implementation for a message system:

// Interface
interface Message {
  send(): string; // Method to send the message
}

// Simple Implementation
class SimpleMessage implements Message {
  private content: string;

  constructor(content: string) {
    this.content = content; // Content of the message
  }

  send(): string {
    return `Sending message: "${this.content}"`;
  }
}

// Decorators
class EmailDecorator implements Message {
  private message: Message; // The wrapped message object

  constructor(message: Message) {
    this.message = message; // Wrap the existing message
  }

  send(): string {
    // Delegate to the wrapped message and add email notification
    return `${this.message.send()} via Email`;
  }
}

class SMSDecorator implements Message {
  private message: Message; // The wrapped message object

  constructor(message: Message) {
    this.message = message; // Wrap the existing message
  }

  send(): string {
    // Delegate to the wrapped message and add SMS notification
    return `${this.message.send()} via SMS`;
  }
}

class PushNotificationDecorator implements Message {
  private message: Message; // The wrapped message object

  constructor(message: Message) {
    this.message = message; // Wrap the existing message
  }

  send(): string {
    // Delegate to the wrapped message and add push notification
    return `${this.message.send()} via Push Notification`;
  }
}

// Client code
// Create a simple message
let myMessage: Message = new SimpleMessage("Hello, this is a test message!");

// Send the basic message
console.log(myMessage.send());

// Decorate with Email notification
myMessage = new EmailDecorator(myMessage);
console.log(myMessage.send());

// Decorate with SMS notification
myMessage = new SMSDecorator(myMessage);
console.log(myMessage.send());

// Decorate with Push Notification
myMessage = new PushNotificationDecorator(myMessage);
console.log(myMessage.send());
