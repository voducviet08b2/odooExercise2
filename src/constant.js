export const originalBoard = [
  [5, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 0, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 0, 6, 0, 0, 9],
  [1, 2, 0, 4, 1, 6, 7, 0, 9],
  [1, 0, 3, 4, 5, 0, 7, 8, 9],
  [1, 2, 0, 4, 5, 6, 7, 0, 0],
  [1, 0, 0, 4, 4, 0, 7, 8, 0],
  [1, 2, 3, 0, 0, 6, 0, 8, 9],
  [1, 2, 0, 4, 5, 6, 0, 8, 9],
];
export const boardRight = _.range(9).map(x => ([{x, y: 2}, {x, y: 5}, {x, y: 8}])).flat()
export const boardBottom = _.range(9).map(y => ([{x: 2, y}, {x: 5, y}, {x: 8, y}])).flat()
export const boardTopBorder = _.range(9).map(y => ([{x: 0, y}])).flat()
export const boardLeftBorder =  _.range(9).map(x => ([{x, y: 0}])).flat()