class Robot {
    bearing: string;
    coordinates: number[];

    constructor(x: number = 0, y: number = 0, bearing: string = "north") {
        this.coordinates = [x, y];
        this.bearing = bearing;
    }

    orient(bearing: string): string | void {
        if (["north", "south", "east", "west"].includes(bearing)) {
            this.bearing = bearing;
        } else {
            return "Invalid Robot Bearing";
        }
    }

    turnRight(): void {
        switch (this.bearing) {
            case "north":
                this.bearing = "east";
                break;
            case "east":
                this.bearing = "south";
                break;
            case "south":
                this.bearing = "west";
                break;
            case "west":
                this.bearing = "north";
                break;
        }
    }

    turnLeft(): void {
        switch (this.bearing) {
            case "north":
                this.bearing = "west";
                break;
            case "east":
                this.bearing = "north";
                break;
            case "south":
                this.bearing = "east";
                break;
            case "west":
                this.bearing = "south";
                break;
        }
    }

    at(x: number, y: number): void {
        this.coordinates = [x, y];
    }

    advance(): void {
        switch (this.bearing) {
            case "north":
                this.coordinates[1] += 1;
                break;
            case "east":
                this.coordinates[0] += 1;
                break;
            case "south":
                this.coordinates[1] -= 1;
                break;
            case "west":
                this.coordinates[0] -= 1;
                break;
        }
    }

    instructions(instructions: string): string[] {
        const instructionsArray: string[] = [];
        for (let i = 0; i < instructions.length; i++) {
            if (instructions[i] === "L") {
                instructionsArray.push("turnLeft");
            } else if (instructions[i] === "R") {
                instructionsArray.push("turnRight");
            } else if (instructions[i] === "A") {
                instructionsArray.push("advance");
            }
        }
        return instructionsArray;
    }

    evaluate(instructions: string): void {
        for (let i = 0; i < instructions.length; i++) {
            if (instructions[i] === "L") {
                this.turnLeft();
            } else if (instructions[i] === "R") {
                this.turnRight();
            } else if (instructions[i] === "A") {
                this.advance();
            }
        }
    }
}

export default Robot;
