// The Composite Design Pattern is a structural design pattern that allows you to 
// compose objects into tree structures to represent part-whole hierarchies. 
// This means you can treat individual objects and compositions of objects uniformly.
// The main purpose of the Composite Pattern is to:
// Allow clients to work with individual objects and compositions of objects in a uniform way.
// Simplify client code by allowing it to treat complex hierarchies in a consistent manner.
// Facilitate the addition of new component types without changing existing code.

// Key Concepts:
// Component: Interface containing common operations for both individual and compositions of objects.
// Leaf: Concrete class implementing the component without children.
// Composite: Concrete class implementing the component containing child components.

// Visual representation:
// Component
//   ├── Leaf (Circle)
//   ├── Leaf (Square)
//   └── Composite
//       ├── Leaf (Circle)
//       └── Composite
//           ├── Leaf (Square)
//           └── Leaf (Circle)

// Example of a Composite implementation for a file system hierarchy:

// Step 1: Define the Component interface
interface FileSystemComponent {
  getSize(): number; // Method to get the size of the component
  display(indent: string): void; // Method to display the component
}

// Step 2: Create Leaf class for FileItem
class FileItem implements FileSystemComponent {
  private name: string;
  private size: number;

  constructor(name: string, size: number) {
      this.name = name;
      this.size = size;
  }

  getSize(): number {
      return this.size; // Return the size of the file item
  }

  display(indent: string): void {
      console.log(`${indent}File: ${this.name} (${this.size} KB)`); // Display file item information
  }
}

// Step 3: Create Composite class for Directory
class Directory implements FileSystemComponent {
  private name: string;
  private components: FileSystemComponent[] = []; // Holds child components

  constructor(name: string) {
      this.name = name;
  }

  add(component: FileSystemComponent): void {
      this.components.push(component); // Add a component to the directory
  }

  remove(component: FileSystemComponent): void {
      const index = this.components.indexOf(component);
      if (index !== -1) {
          this.components.splice(index, 1); // Remove a component from the directory
      }
  }

  getSize(): number {
      return this.components.reduce((total, component) => total + component.getSize(), 0); // Sum sizes of all components
  }

  display(indent: string): void {
      console.log(`${indent}Directory: ${this.name}`); // Display directory name
      for (const component of this.components) {
          component.display(indent + '  '); // Display each component in the directory
      }
  }
}

// Step 4: Client code to use the Composite pattern
const fileItem1 = new FileItem('File1.txt', 15);
const fileItem2 = new FileItem('File2.txt', 20);
const fileItem3 = new FileItem('File3.jpg', 100);

const dir1 = new Directory('Documents');
dir1.add(fileItem1);
dir1.add(fileItem2);

const dir2 = new Directory('Images');
dir2.add(fileItem3);

const rootDir = new Directory('Root');
rootDir.add(dir1);
rootDir.add(dir2);

// Step 5: Display the file system structure
rootDir.display('');
console.log(`Total Size: ${rootDir.getSize()} KB`); // Display total size of the root directory
