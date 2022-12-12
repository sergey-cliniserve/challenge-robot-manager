import {Robot as RobotSimulator} from "../robot-simulator";

export default class RobotManager {
  private robots: Set<RobotSimulator> = new Set();

  addRobot(robot: RobotSimulator): void {
    this.robots.add(robot);
  }

  listRobots(): RobotSimulator[] {
    return [...this.robots.values()];
  }
}
