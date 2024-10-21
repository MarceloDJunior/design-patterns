// The Factory Pattern is a design pattern used to create objects without 
// specifying the exact class of the object being created. It provides a 
// way to delegate the responsibility of object creation to a factory, 
// which can decide which class to instantiate based on certain conditions. 
// This pattern is useful when you want to create different types of objects 
// that share a common interface or superclass, but the specific type can vary.

// Key concepts:
// Encapsulating Object Creation: The logic for creating objects is 
// contained in one place (the factory), making it easier to manage.
// Reducing Dependencies: Client code does not need to know about 
// specific classes; it interacts with the factory instead.
// Supporting Runtime Decisions: You can create different types of 
// objects based on conditions known only at runtime, such as user 
// input or configuration settings.
// Easily Adding New Types: You can introduce new object types 
// without changing existing code, simply by updating the factory.

// Example of a factory to create characters in a video game

// Character interface
interface Character {
  attack(): void;
}

// Warrior class
class Warrior implements Character {
  attack(): void {
    console.log('The warrior swings his sword!');
  }
}

// Mage class
class Mage implements Character {
  attack(): void {
    console.log('The mage casts a fireball!');
  }
}

// Archer class
class Archer implements Character {
  attack(): void {
    console.log('The archer shoots an arrow!');
  }
}

// CharacterFactory class
class CharacterFactory {
  static createCharacter(type: string): Character {
    switch (type.toLowerCase()) {
      case 'warrior':
        return new Warrior();
      case 'mage':
        return new Mage();
      case 'archer':
        return new Archer();
      default:
        throw new Error(`Unknown character type: ${type}`);
    }
  }
}

// Example usage
function main() {
  const mage: Character = CharacterFactory.createCharacter('mage');
  mage.attack(); // Output: The mage casts a fireball!

  const warrior: Character = CharacterFactory.createCharacter('warrior');
  warrior.attack(); // Output: The warrior swings his sword!
}

// Run the main function
main();