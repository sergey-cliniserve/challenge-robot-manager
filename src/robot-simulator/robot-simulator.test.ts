import {Robot} from './robot-simulator'
import {Directions} from "./types/types";

describe('Robot', () => {
  const robot = new Robot()

  it('robot bearing', () => {
    const directions = ['east', 'west', 'north', 'south'] as Directions[];

    directions.forEach((currentDirection) => {
      robot.orient(currentDirection)
      expect(robot.bearing).toEqual(currentDirection)
    })
  })

  it('invalid robot bearing', () => {
    try {
      robot.orient('crood' as any)
    } catch (exception) {
      expect(exception.message).toEqual('Invalid Robot Bearing')
    }
  })

  it('turn right from north', () => {
    robot.orient(Directions.north)
    robot.turnRight()
    expect(robot.bearing).toEqual('east')
  })

  it('turn right from east', () => {
    robot.orient(Directions.east)
    robot.turnRight()
    expect(robot.bearing).toEqual('south')
  })

  it('turn right from south', () => {
    robot.orient(Directions.south)
    robot.turnRight()
    expect(robot.bearing).toEqual('west')
  })

  it('turn right from west', () => {
    robot.orient(Directions.west)
    robot.turnRight()
    expect(robot.bearing).toEqual('north')
  })

  it('turn left from north', () => {
    robot.orient(Directions.north)
    robot.turnLeft()
    expect(robot.bearing).toEqual('west')
  })

  it('turn left from east', () => {
    robot.orient(Directions.east)
    robot.turnLeft()
    expect(robot.bearing).toEqual('north')
  })

  it('turn left from south', () => {
    robot.orient(Directions.south)
    robot.turnLeft()
    expect(robot.bearing).toEqual('east')
  })

  it('turn left from west', () => {
    robot.orient(Directions.west)
    robot.turnLeft()
    expect(robot.bearing).toEqual('south')
  })

  it('robot coordinates', () => {
    robot.at(3, 0)
    expect(robot.coordinates).toEqual([3, 0])
  })

  it('other robot coordinates', () => {
    robot.at(-2, 5)
    expect(robot.coordinates).toEqual([-2, 5])
  })

  it('advance when facing north', () => {
    robot.at(0, 0)
    robot.orient(Directions.north)
    robot.advance()
    expect(robot.coordinates).toEqual([0, 1])
  })

  it('advance when facing east', () => {
    robot.at(0, 0)
    robot.orient(Directions.east)
    robot.advance()
    expect(robot.coordinates).toEqual([1, 0])
  })

  it('advance when facing south', () => {
    robot.at(0, 0)
    robot.orient(Directions.south)
    robot.advance()
    expect(robot.coordinates).toEqual([0, -1])
  })

  it('advance when facing west', () => {
    robot.at(0, 0)
    robot.orient(Directions.west)
    robot.advance()
    expect(robot.coordinates).toEqual([-1, 0])
  })

  it('instructions for turning left', () => {
    expect(robot.instructions('L')).toEqual(['turnLeft'])
  })

  it('instructions for turning right', () => {
    expect(robot.instructions('R')).toEqual(['turnRight'])
  })

  it('instructions for advancing', () => {
    expect(robot.instructions('A')).toEqual(['advance'])
  })

  it('series of instructions', () => {
    expect(robot.instructions('RAAL'))
      .toEqual(['turnRight', 'advance', 'advance', 'turnLeft'])
  })

  it('invalid robot bearing', () => {
    try {
      robot.instructions('TEST')
    } catch (exception) {
      expect(exception.message).toEqual('Invalid command')
    }
  })

  it('instruct robot', () => {
    const robotI = new Robot(-2, 1, Directions.east)
    robotI.evaluate('RLAALAL')
    expect(robotI.coordinates).toEqual([0, 2])
    expect(robotI.bearing).toEqual('west')
  })

  it('instruct many robots', () => {
    const robot1 = new Robot(0, 0, Directions.north)
    const robot2 = new Robot(2, -7, Directions.east)
    const robot3 = new Robot(8, 4, Directions.south)
    robot1.evaluate('LAAARALA')
    robot2.evaluate('RRAAAAALA')
    robot3.evaluate('LAAARRRALLLL')

    expect(robot1.coordinates).toEqual([-4, 1])
    expect(robot1.bearing).toEqual('west')

    expect(robot2.coordinates).toEqual([-3, -8])
    expect(robot2.bearing).toEqual('south')

    expect(robot3.coordinates).toEqual([11, 5])
    expect(robot3.bearing).toEqual('north')
  })
})
