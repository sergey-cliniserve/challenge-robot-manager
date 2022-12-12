import {Directions} from "./types/types";
import {isValidDirection} from "./utils/validators";
import {getNextDirection, getPrevDirection} from "./helpers/directions";
import {Movable} from "./types/abstractions/Movable";
import {RobotController} from "./src/modules/controllers/robotController";

export class Robot implements Movable{
  private _bearing: Directions;
  private _coordinateX: number;
  private _coordinateY: number;
  private robotController: RobotController;


  constructor(coordinateX: number = 0, coordinateY: number = 0, bearing: Directions = Directions.north) {
    this._bearing = bearing;
    this._coordinateX = coordinateX;
    this._coordinateY = coordinateY;
    this.robotController = new RobotController(this);
  }

  get bearing(): Directions {
    return this._bearing;
  }

  orient(direction: Directions): void {
    if (!isValidDirection(direction)) {
      throw new Error('Invalid Robot Bearing')
    }

    this._bearing = direction;
  }

  turnRight(): void {
    const nextDirection: Directions = getNextDirection(this._bearing)
    this._bearing = nextDirection;
  }

  turnLeft(): void {
    const prevDirection: Directions = getPrevDirection(this._bearing)
    this._bearing = prevDirection;
  }

  at(x: number, y: number): void {
    this._coordinateX = x;
    this._coordinateY = y;
  }

  get coordinates(): [number, number]{
    return [this._coordinateX, this._coordinateY]
  }

  advance(): void {
    if (this._bearing === Directions.north) {
      this._coordinateY++;
    } else if (this._bearing === Directions.east) {
      this._coordinateX++;
    } else if (this._bearing === Directions.south) {
      this._coordinateY--;
    } else if (this._bearing === Directions.west) {
      this._coordinateX--;
    }

    //TODO: reconsider implementation if will have enough time
  }

  instructions(commandString: string): string[] {
    return this.robotController.instructions(commandString);
  }

  evaluate(commandString: string): void {
    return this.robotController.evaluate(commandString);
  }
}
