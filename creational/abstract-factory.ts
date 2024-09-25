// The Abstract Factory pattern provides a way to create families of related objects 
// without specifying their concrete classes. This pattern is useful when you need to 
// create multiple related objects that share common rules but may have different 
// implementations. By using an abstract factory, you can enforce consistency while 
// keeping your code loosely coupled, as the specific details are handled in the 
// concrete classes.

// Key Concepts:
// Abstract Factory: An interface that declares methods for creating abstract products.
// Concrete Factory: Implements the abstract factory interface and creates concrete products.
// Abstract Product: An interface for a type of product (e.g., ProductA, ProductB).
// Concrete Products: Implementations of the abstract products.
//
// Some good examples that can make use of the abstract factory are:
// UI Libraries: 
//  - Creating different UI components for different themes or platforms (e.g., web, mobile).
// Game Development: 
//  - Generating different types of characters, enemies, and items that belong to specific factions or worlds.
// Data Access Layer: 
//  - Abstracting the creation of database connections or repositories for various data sources (SQL, NoSQL).
// Document Processing: 
//  - Supporting different document formats (e.g., PDF, Word, HTML) with a family of related operations for each format.


// 1 - Example of a UI library making use of the abstract factory to created themed components

// Abstract Products
interface Button {
  render(): string;
}

interface TextField {
  render(): string;
}

// Concrete Products for Light Theme
class LightButton implements Button {
  render(): string {
      return "Rendering a light button.";
  }
}

class LightTextField implements TextField {
  render(): string {
      return "Rendering a light text field.";
  }
}

// Concrete Products for Dark Theme
class DarkButton implements Button {
  render(): string {
      return "Rendering a dark button.";
  }
}

class DarkTextField implements TextField {
  render(): string {
      return "Rendering a dark text field.";
  }
}

// Abstract Factory
interface UIComponentFactory {
  createButton(): Button;
  createTextField(): TextField;
}

// Concrete Factory for Light Theme
class LightThemeFactory implements UIComponentFactory {
  createButton(): Button {
      return new LightButton();
  }

  createTextField(): TextField {
      return new LightTextField();
  }
}

// Concrete Factory for Dark Theme
class DarkThemeFactory implements UIComponentFactory {
  createButton(): Button {
      return new DarkButton();
  }

  createTextField(): TextField {
      return new DarkTextField();
  }
}

// Client code
function renderUI(factory: UIComponentFactory) {
  const button = factory.createButton();
  const textField = factory.createTextField();

  console.log(button.render());
  console.log(textField.render());
}

// Usage
const lightThemeFactory = new LightThemeFactory();
renderUI(lightThemeFactory);

const darkThemeFactory = new DarkThemeFactory();
renderUI(darkThemeFactory);

// 2 - Example of a database access layer making use of the abstract factory to work with SQL and NoSQL databases

// Abstract Products
interface DatabaseConnection {
  connect(): void;
  disconnect(): void;
}

interface QueryBuilder {
  select(table: string, fields: string[]): string;
  insert(table: string, data: object): string;
}

// Concrete products for SQL database
class SqlConnection implements DatabaseConnection {
  connect(): void {
      console.log("Connected to SQL Database.");
  }

  disconnect(): void {
      console.log("Disconnected from SQL Database.");
  }
}

class SqlQueryBuilder implements QueryBuilder {
  select(table: string, fields: string[]): string {
      return `SELECT ${fields.join(", ")} FROM ${table};`;
  }

  insert(table: string, data: object): string {
      const fields = Object.keys(data).join(", ");
      const values = Object.values(data)
          .map(value => `'${value}'`)
          .join(", ");
      return `INSERT INTO ${table} (${fields}) VALUES (${values});`;
  }
}

// Concrete products for NoSQL database
class NoSqlConnection implements DatabaseConnection {
  connect(): void {
      console.log("Connected to NoSQL Database.");
  }

  disconnect(): void {
      console.log("Disconnected from NoSQL Database.");
  }
}

class NoSqlQueryBuilder implements QueryBuilder {
  select(table: string, fields: string[]): string {
      return `db.${table}.find({}, { ${fields.join(", ")} });`;
  }

  insert(table: string, data: object): string {
      return `db.${table}.insert(${JSON.stringify(data)});`;
  }
}

// Abstract Factory
interface DatabaseFactory {
  createConnection(): DatabaseConnection;
  createQueryBuilder(): QueryBuilder;
}

// SQL Database Factory
class SqlDatabaseFactory implements DatabaseFactory {
  createConnection(): DatabaseConnection {
      return new SqlConnection();
  }

  createQueryBuilder(): QueryBuilder {
      return new SqlQueryBuilder();
  }
}

// NoSQL Database Factory
class NoSqlDatabaseFactory implements DatabaseFactory {
  createConnection(): DatabaseConnection {
      return new NoSqlConnection();
  }

  createQueryBuilder(): QueryBuilder {
      return new NoSqlQueryBuilder();
  }
}

// Client code
function setupDatabase(factory: DatabaseFactory) {
  const connection = factory.createConnection();
  const queryBuilder = factory.createQueryBuilder();

  connection.connect();

  // Example usage of the query builder
  const selectQuery = queryBuilder.select("users", ["id", "name"]);
  console.log(selectQuery);

  const insertQuery = queryBuilder.insert("users", { id: 1, name: "Alice" });
  console.log(insertQuery);

  connection.disconnect();
}

// Usage
const sqlFactory = new SqlDatabaseFactory();
setupDatabase(sqlFactory);

const noSqlFactory = new NoSqlDatabaseFactory();
setupDatabase(noSqlFactory);