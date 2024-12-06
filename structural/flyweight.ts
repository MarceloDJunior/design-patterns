// The Flyweight Pattern is a structural design pattern that aims to reduce memory usage 
// by sharing common parts of state between multiple objects. This is particularly useful in 
// situations where a large number of similar objects need to be created, and many of these 
// objects share common data or states, allowing you to minimize memory footprint and improve performance.

// Key concepts:
// Intrinsic State: Shared data among instances, part of the flyweight object, and does not change.
// Extrinsic State: Unique data for each instance, typically passed to the flyweight object when needed.
// Flyweight Factory: Manages creation and sharing of flyweight objects, ensuring reuse to prevent duplicates.

// When to use it:
// When an application needs to create a large number of objects that share common data.
// When memory usage is a concern, and you want to reduce the number of duplicate objects.
// When the cost of creating and managing many similar objects is high.

// Example of a Flyweight implementation for an action game:

// Define the Flyweight Interface
interface GameCharacter {
  display(): void; // Display the soldier's intrinsic state
}

// Create the Concrete Flyweight Class
class Soldier implements GameCharacter {
  private type: string; // Intrinsic state
  private weapon: string; // Intrinsic state

  constructor(type: string, weapon: string) {
      this.type = type;
      this.weapon = weapon;
  }

  display(): void {
      console.log(`Soldier Type: ${this.type}, Weapon: ${this.weapon}`);
  }
}
// Create the Flyweight Factory
class SoldierFactory {
  private soldiers: { [key: string]: Soldier } = {};

  getSoldier(type: string, weapon: string): Soldier {
      const key = `${type}-${weapon}`;
      if (!this.soldiers[key]) {
          this.soldiers[key] = new Soldier(type, weapon);
          console.log(`Creating new soldier: ${key}`);
      } else {
          console.log(`Reusing existing soldier: ${key}`);
      }
      return this.soldiers[key];
  }
}

// Create the Battlefield Class to manage the shared state
interface SoldierOptions {
  type: string;
  weapon: string;
  position: {
      x: number;
      y: number;
  };
  health: number;
}

class Battlefield {
  private soldiers: { soldier: Soldier; position: { x: number; y: number }; health: number }[] = [];

  addSoldier(factory: SoldierFactory, options: SoldierOptions): void {
      // Type and weapons are the intrinsic state (shared)
      const soldier = factory.getSoldier(options.type, options.weapon);
      // Position and health are the extrinsic state (unique)
      this.soldiers.push({ soldier, position: options.position, health: options.health });
  }

  displaySoldiers(): void {
      this.soldiers.forEach(({ soldier, position, health }) => {
          soldier.display();
          console.log(`Position: (${position.x}, ${position.y}), Health: ${health}`);
      });
  }
}
// Client code
const factory = new SoldierFactory();
const battlefield = new Battlefield();

// Add soldiers to the battlefield using named parameters
battlefield.addSoldier(factory, {
    type: 'Infantry',
    weapon: 'Rifle',
    position: { x: 10, y: 20 },
    health: 100
});
battlefield.addSoldier(factory, {
    type: 'Infantry',
    weapon: 'Rifle',
    position: { x: 30, y: 40 },
    health: 80
});
battlefield.addSoldier(factory, {
    type: 'Sniper',
    weapon: 'Sniper Rifle',
    position: { x: 50, y: 60 },
    health: 90
});
battlefield.addSoldier(factory, {
    type: 'Infantry',
    weapon: 'Shotgun',
    position: { x: 70, y: 80 },
    health: 70
});
battlefield.addSoldier(factory, {
    type: 'Infantry',
    weapon: 'Rifle',
    position: { x: 90, y: 100 },
    health: 50
}); // Reuses existing Infantry with Rifle

// Display soldiers on the battlefield
battlefield.displaySoldiers();