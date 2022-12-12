import {Movable} from "../../../types/abstractions/Movable";
import {Command} from "../../../types/abstractions/Command";
import {isValidCommandString} from "../../../utils/validators";
import {AdvanceCommand, TurnLeftCommand, TurnRightCommand} from "../commands/MovementCommands";

export class RobotController {
  private readonly subject: Movable;

  constructor(subject: Movable) {
    this.subject = subject;
  }

  private serializeCommands(commandString: string): Command[]{
    if (!isValidCommandString(commandString)) {
      throw new Error('Invalid command');
    }
    return [...commandString].map((command) => {
      if (command === 'L') {
        return new TurnLeftCommand(this.subject);
      } else if (command === 'R') {
        return new TurnRightCommand(this.subject);
      } else {
        return new AdvanceCommand(this.subject);
      }
    });
  }

  instructions(commandString: string): string[] {
    return this.serializeCommands(commandString).map(command => command.toString())
  }

  evaluate(commandString: string): void {
    const commands = this.serializeCommands(commandString);
    for (const command of commands) {
      command.execute();
    }
  }
}
