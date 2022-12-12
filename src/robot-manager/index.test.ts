import RobotManager from ".";
import {Robot as RobotSimulator} from "../robot-simulator";

describe("RobotManager", () => {
  describe("add robots", () => {
    it("adds a robot", () => {
      const rm = new RobotManager();
      const newRobot = new RobotSimulator(5, 5, 'north');
      rm.addRobot(newRobot);

      expect(rm.listRobots()).toEqual([newRobot]);
    });
  });
});
