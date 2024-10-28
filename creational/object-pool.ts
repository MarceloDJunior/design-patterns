// The Object Pool pattern allows for the reuse of existing object instances 
// instead of creating new ones. It maintains a collection of available instances 
// in an array and returns one when requested by clients. After the client 
// finishes using the instance, they can release it back to the pool, making it 
// available for reuse by other clients. This pattern can significantly improve 
// performance in scenarios where the cost of instantiating new objects is high.

// Key concepts:
// Object Reuse: Reuses existing object instances instead of creating new ones to minimize overhead.
// Pooling Mechanism: Maintains a collection of pre-instantiated objects available for client requests.
// Lifecycle Management: Manages the creation, allocation, and deallocation of objects in the pool.
// Resource Management: Efficiently handles limited resources like database connections or threads.
// Performance Improvement: Reduces performance overhead by minimizing expensive object instantiations.
// Concurrency Control: Ensures safe access to pooled objects in multi-threaded environments.
// Configuration: Allows customization of pool parameters such as maximum size and idle timeout.
// Client Interaction: Involves borrowing, using, and returning objects to the pool by clients.
// Flexibility: Adaptable for various object types and scenarios across different applications.

// Example of an object pool to manage database connections

// Connection class
class Connection {
  private id: number;
  public isActive: boolean;

  constructor(id: number) {
      this.id = id;
      this.isActive = false;
      console.log(`Connection ${id} created`);
  }

  public query(sql: string): void {
      if (this.isActive) {
          console.log(`Executing query on connection ${this.id}: ${sql}`);
      } else {
          console.log(`Connection ${this.id} is not active.`);
      }
  }

  public close(): void {
      this.isActive = false; // Mark connection as inactive
      console.log(`Connection ${this.id} closed`);
  }

  public activate(): void {
      this.isActive = true; // Reactivate the connection
      console.log(`Connection ${this.id} activated`);
  }
}

// Connection object pool
class ConnectionPool {
  private static instance: ConnectionPool; // Singleton instance
  private pool: Connection[] = []; // Array to hold connections
  private maxConnections: number = 1; // Maximum number of connections allowed

  private constructor() {} // Private constructor for singleton

  public static getInstance(): ConnectionPool {
      if (!ConnectionPool.instance) {
          ConnectionPool.instance = new ConnectionPool(); // Create instance if it doesn't exist
      }
      return ConnectionPool.instance; // Return the singleton instance
  }

  public setMaxConnections(maxConnections: number): void {
      this.maxConnections = maxConnections; // Set the maximum number of connections
  }

  public acquire(): Connection | null {
      // Check for an available connection
      for (const connection of this.pool) {
          if (!connection.isActive) {
              connection.activate()
              return connection; // Return the first available connection
          }
      }

      // Create a new connection if the limit hasn't been reached
      if (this.pool.length < this.maxConnections) {
          const connection = new Connection(this.pool.length + 1);
          this.pool.push(connection); // Add new connection to the pool
          connection.activate()
          return connection; // Return the new connection
      }

      return null; // No available connections
  }

  public release(connection: Connection): void {
      connection.close();
  }
}

// Usage
const pool = ConnectionPool.getInstance(); 
pool.setMaxConnections(2); // Set the maximum number of connections to 3

// Acquire a new connection.
const connection1 = pool.acquire()
if(connection1) {
  connection1.query("SELECT * FROM users");
  pool.release(connection1)
} 

// Pool has been released. Same connection should be reused on connection 2
const connection2 = pool.acquire()
if(connection2) {
  connection2.query("SELECT * FROM orders");
}

// Pool has not been released. A new connection should be created for connection 3
const connection3 = pool.acquire()
if(connection3) {
  connection3.query("SELECT * FROM products");
} 

// Pool has reached the defined limit of 2 connections. No instance should be returned
const connection4 = pool.acquire()
if(connection4) {
  connection4.query("SELECT * FROM categories");
} else {
  console.log("No available connections in the pool.")
}