// The Singleton pattern ensures that a class has only one instance and 
// provides a global point of access to that instance. This can be useful 
// in scenarios where exactly one object is needed to coordinate actions across 
// the system, such as a configuration manager, logging service, or connection pool.

// Key Concepts:
// Single Instance: Only one instance of the class is created.
// Global Access: The instance is accessible globally within the application.
// Lazy Initialization: The instance is created only when it is needed.

// Example of a logger singleton

class Logger {
  // The static variable that holds the single instance of the Logger class
  private static instance: Logger;

  // Private constructor to prevent instantiation from outside
  private constructor() {}

  // Public method to get the instance of the Logger class
  public static getInstance(): Logger {
      // Check if the instance already exists
      if (!Logger.instance) {
          // If not, create a new instance
          Logger.instance = new Logger();
      }
      // Return the existing instance
      return Logger.instance;
  }

  // Method to log info messages
  public logInfo(message: string): void {
      console.log(`INFO: ${new Date().toISOString()} - ${message}`);
  }

  // Method to log warning messages
  public logWarning(message: string): void {
      console.warn(`WARNING: ${new Date().toISOString()} - ${message}`);
  }

  // Method to log error messages
  public logError(message: string): void {
      console.error(`ERROR: ${new Date().toISOString()} - ${message}`);
  }
}

// Usage Example

// Get the singleton instance
const logger1 = Logger.getInstance();
const logger2 = Logger.getInstance();

// Check if both instances are the same
console.log(logger1 === logger2); // true

// Log messages using the singleton instance
logger1.logInfo("Application has started.");
logger2.logError("Error in the application.");