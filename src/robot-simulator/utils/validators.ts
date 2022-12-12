import {Commands, Directions} from "../types/types";

export const isValidDirection = (direction: string): boolean => {
  return Object.values(Directions).includes(direction as any);
}
//TODO cover validator via unit tests

export const isValidCommandString = (commandString: string) => {
  const allowedSymbolsInCommand = Object.keys(Commands).join('');
  const pattern = new RegExp(`^[${allowedSymbolsInCommand}]*$`);
  return pattern.test(commandString);
}
