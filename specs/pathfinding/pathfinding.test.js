// write in a function thats a X by X array of arrays of numbers
// as well two x/y combinations and have it return the shortest
// length (you don't need to track the actual path) from point A
// to point B.
//
// the numbers in the maze array represent as follows:
// 0 – open space
// 1 - closed space, cannot pass through. a wall
// 2 - one of the two origination points
//
// you will almost certainly need to transform the maze into your own
// data structure to keep track of all the meta data

// this is a little tool I wrote to log out the maze to the console.
// it is opinionated of how to do that and you do not have to do it
// the way I did. however feel free to use it if you'd like
const logMaze = require("./logger");

const NO_ONE = 0;
const A = 1;
const B = 2;

class Coordinate {
  constructor(x, y, occupant, isAWall) {
    this.y = y;
    this.x = x;
    this.occupant = occupant;
    this.isAWall = isAWall;
    this.distance = 0;
  }
}

const generateVisitedMaze = (maze) => {
  const visitedPaths = [];

  for (let y = 0; y < maze.length; y++) {
    const currentRow = [];
    for (let x = 0; x < maze[y].length; x++) {
      const newCoordinate = new Coordinate(x, y, NO_ONE, maze[y][x] === 1);
      currentRow.push(newCoordinate);
    }
    visitedPaths.push(currentRow);
  }

  return visitedPaths;
};

function findShortestPathLength(maze, [xA, yA], [xB, yB]) {
  const visitedMaze = generateVisitedMaze(maze);

  visitedMaze[yA][xA].occupant = A;
  visitedMaze[yB][xB].occupant = B;

  const aQueue = [visitedMaze[yA][xA]];
  const bQueue = [visitedMaze[yB][xB]];
  let iteration = 0;

  while (aQueue.length && bQueue.length) {
    iteration++;
    let currentAQueueLength = aQueue.length;
    let currentBQueueLength = bQueue.length;

    let aNeighbours = [];
    while (currentAQueueLength) {
      const currentLocation = aQueue.shift();
      aNeighbours = aNeighbours.concat(
        getNeighbours(visitedMaze, currentLocation),
      );
      currentAQueueLength--;
    }
    for (let i = 0; i < aNeighbours.length; i++) {
      const currentNeighbour = aNeighbours[i];
      if (currentNeighbour.occupant === B) {
        return currentNeighbour.distance + iteration;
      } else if (currentNeighbour.occupant === NO_ONE) {
        currentNeighbour.distance = iteration;
        currentNeighbour.occupant = A;
        aQueue.push(currentNeighbour);
      }
    }

    let bNeighbours = [];
    while (currentBQueueLength) {
      const currentLocation = bQueue.shift();
      bNeighbours = bNeighbours.concat(
        getNeighbours(visitedMaze, currentLocation),
      );
      currentBQueueLength--;
    }
    for (let i = 0; i < bNeighbours.length; i++) {
      const currentNeighbour = bNeighbours[i];
      if (currentNeighbour.occupant === A) {
        return currentNeighbour.distance + iteration;
      } else if (currentNeighbour.occupant === NO_ONE) {
        currentNeighbour.distance = iteration;
        currentNeighbour.occupant = B;
        bQueue.push(currentNeighbour);
      }
    }
  }

  return -1;
}

const getNeighbours = (visitedMaze, location) => {
  const y = location.y;
  const x = location.x;

  const neighbours = [];

  if (y - 1 >= 0 && !visitedMaze[y - 1][x].isAWall) {
    neighbours.push(visitedMaze[y - 1][x]);
  }
  if (y + 1 < visitedMaze[0].length && !visitedMaze[y + 1][x].isAWall) {
    neighbours.push(visitedMaze[y + 1][x]);
  }
  if (x - 1 >= 0 && !visitedMaze[y][x - 1].isAWall) {
    neighbours.push(visitedMaze[y][x - 1]);
  }
  if (x + 1 < visitedMaze[0].length && !visitedMaze[y][x + 1].isAWall) {
    neighbours.push(visitedMaze[y][x + 1]);
  }

  return neighbours;
};

// there is a visualization tool in the completed exercise
// it requires you to shape your objects like I did
// see the notes there if you want to use it

// unit tests
// do not modify the below code
describe("pathfinding – happy path", function () {
  const fourByFour = [
    [2, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 2],
  ];
  it("should solve a 4x4 maze", () => {
    expect(findShortestPathLength(fourByFour, [0, 0], [3, 3])).toEqual(6);
  });

  const sixBySix = [
    [0, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 2, 0, 0, 0],
  ];
  it("should solve a 6x6 maze", () => {
    expect(findShortestPathLength(sixBySix, [1, 1], [2, 5])).toEqual(7);
  });

  const eightByEight = [
    [0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 0],
    [0, 2, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 2],
  ];
  it("should solve a 8x8 maze", () => {
    expect(findShortestPathLength(eightByEight, [1, 7], [7, 7])).toEqual(16);
  });

  const fifteenByFifteen = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0],
    [0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0],
    [0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 0, 1, 0, 1, 0, 1, 1, 2, 1, 0, 1, 0, 1, 0],
    [0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  it("should solve a 15x15 maze", () => {
    expect(findShortestPathLength(fifteenByFifteen, [1, 1], [8, 8])).toEqual(
      78,
    );
  });
});

// I care far less if you solve these
// nonetheless, if you're having fun, solve some of the edge cases too!
// just remove the .skip from describe.skip
describe("pathfinding – edge cases", function () {
  const byEachOther = [
    [0, 0, 0, 0, 0],
    [0, 2, 2, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1],
    [0, 0, 0, 0, 0],
  ];
  it("should solve the maze if they're next to each other", () => {
    expect(findShortestPathLength(byEachOther, [1, 1], [2, 1])).toEqual(1);
  });

  const impossible = [
    [0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0],
    [0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0],
    [0, 0, 0, 0, 2],
  ];
  it("should return -1 when there's no possible path", () => {
    expect(findShortestPathLength(impossible, [1, 1], [4, 4])).toEqual(-1);
  });
});
