// The Facade Pattern is a structural design pattern that provides a simplified interface 
// to a more complex subsystem. It acts as a wrapper around a collection of classes, making 
// the subsystem easier to use by exposing a single interface. This pattern is especially 
// useful when you want to reduce the complexity of interactions between multiple components 
// or when you want to improve the usability of a system.

// Key concepts
// Simplification: The Facade Pattern simplifies interactions with a complex system by providing 
// a single, unified interface.
// Decoupling: It decouples the client's code from the complex subsystem, leading to better maintainability.
// Single Responsibility Principle: The facade can encapsulate various operations and functions from 
// different classes, making it easier to manage and understand.

// Components
// Facade: This is the class that provides a simple interface to the complex system.
// Subsystem Classes: These are the complex classes that the facade wraps. 
// They may be difficult to use directly due to their complexity.

// Example of a Facade to manage a home theater

// Subsystem classes
class TV {
  turnOn() {
      console.log("TV is now ON.");
  }
  turnOff() {
      console.log("TV is now OFF.");
  }
}

class DVDPlayer {
  insertDVD(dvd: string) {
      console.log(`DVD "${dvd}" inserted.`);
  }
  play() {
      console.log("Playing DVD.");
  }
  stop() {
      console.log("DVD stopped.");
  }
}

class SoundSystem {
  turnOn() {
      console.log("Sound System is now ON.");
  }
  turnOff() {
      console.log("Sound System is now OFF.");
  }
  setVolume(level: number) {
      console.log(`Sound System volume set to ${level}.`);
  }
}

// Facade class
class HomeTheaterFacade {
  private tv: TV;
  private dvdPlayer: DVDPlayer;
  private soundSystem: SoundSystem;

  constructor(tv: TV, dvdPlayer: DVDPlayer, soundSystem: SoundSystem) {
      this.tv = tv;
      this.dvdPlayer = dvdPlayer;
      this.soundSystem = soundSystem;
  }

  watchMovie(dvd: string) {
      console.log("Get ready to watch a movie...");
      this.tv.turnOn();
      this.soundSystem.turnOn();
      this.soundSystem.setVolume(10);
      this.dvdPlayer.insertDVD(dvd);
      this.dvdPlayer.play();
  }

  endMovie() {
      console.log("Shutting down the home theater...");
      this.dvdPlayer.stop();
      this.soundSystem.turnOff();
      this.tv.turnOff();
  }
}

// Client code
const tv = new TV();
const dvdPlayer = new DVDPlayer();
const soundSystem = new SoundSystem();

const homeTheater = new HomeTheaterFacade(tv, dvdPlayer, soundSystem);

// Watching a movie
homeTheater.watchMovie("Inception");
console.log("--------------------------------------------------");
// Ending the movie
homeTheater.endMovie();