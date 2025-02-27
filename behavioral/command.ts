// The Command Design Pattern is a behavioral design pattern that encapsulates a request as an object, 
// thereby allowing for parameterization of clients with different requests, queuing of requests, and 
// logging of the requests. It also provides support for undoable operations. This pattern is particularly 
// useful when you need to decouple the sender of a request from the object that handles the request.

// Key Components
// Command Interface: This defines a method for executing a command. 
// All concrete command classes will implement this interface.
// Concrete Command: These classes implement the Command interface and define the binding between 
// a receiver and an action. Each concrete command will execute a specific operation on the receiver.
// Receiver: The object that performs the actual work. The receiver knows how to perform the operations 
// associated with carrying out a request.
// Invoker: This is the object that holds the command and calls it to execute the request. 
// The invoker does not need to know the details of how the command is executed.
// Client: The client creates a command object and associates it with a receiver. 
// It also sets up the invoker with the command.

// Example of a command implementation for a text editor

// Command interface
interface Command {
  execute(): void;
  undo(): void;
}

// Receiver class
class TextEditor {
  private text: string = '';

  type(text: string): void {
      this.text += text;
      console.log(`Current Text: ${this.text}`);
  }

  delete(): void {
      this.text = this.text.slice(0, -1);
      console.log(`Current Text after delete: ${this.text}`);
  }

  getText(): string {
      return this.text;
  }
}

// Concrete Command for typing text
class TypeCommand implements Command {
  private editor: TextEditor;
  private text: string;

  constructor(editor: TextEditor, text: string) {
      this.editor = editor;
      this.text = text;
  }

  execute(): void {
      this.editor.type(this.text);
  }

  undo(): void {
      for (let i = 0; i < this.text.length; i++) {
          this.editor.delete();
      }
  }
}

// Invoker class
class CommandManager {
  private commands: Command[] = [];
  private index: number = -1;

  executeCommand(command: Command): void {
      command.execute();
      this.commands.splice(this.index + 1);
      this.commands.push(command);
      this.index++;
  }

  undo(): void {
      if (this.index >= 0) {
          const command = this.commands[this.index];
          command.undo();
          this.index--;
      } else {
          console.log("No command to undo.");
      }
  }

  redo(): void {
      if (this.index + 1 < this.commands.length) {
          this.index++;
          const command = this.commands[this.index];
          command.execute();
      } else {
          console.log("No command to redo.");
      }
  }
}

// Client code
const editor = new TextEditor();
const commandManager = new CommandManager();

commandManager.executeCommand(new TypeCommand(editor, "Hello"));
commandManager.executeCommand(new TypeCommand(editor, " World!"));
commandManager.undo(); // Output: Current Text after delete: Hello
commandManager.redo(); // Output: Current Text: Hello World!