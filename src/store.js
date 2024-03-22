import { owl } from "@odoo/owl";
import "./app.scss";

const { Store } = owl;

const originalBoard = [
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
  
  export function createTaskStore() {
    const state = {
      board: JSON.parse(JSON.stringify(originalBoard)),
      isActiveNote: { value: false },
      aroundCell: [],
      boardRight: function () {
        const arr = [];
        for (let i = 0; i < 9; i++) {
          arr.push({ x: i, y: 2 });
          arr.push({ x: i, y: 5 });
          arr.push({ x: i, y: 8 });
        }
        return arr;
      },
      boardBottom: function () {
        const arr = [];
        for (let i = 0; i < 9; i++) {
          arr.push({ x: 2, y: i });
          arr.push({ x: 5, y: i });
          arr.push({ x: 8, y: i });
        }
        return arr;
      },
      boardTopBorder: function () {
        const arr = [];
        for (let i = 0; i < 9; i++) {
          arr.push({ x: 0, y: i });
        }
        return arr;
      },
      boardLeftBorder: function () {
        const arr = [];
        for (let i = 0; i < 9; i++) {
          arr.push({ x: i, y: 0 });
        }
        return arr;
      },
      boardHightlightAround: function () {
        const matrices = [];
        // Loop through rows
        for (let i = 0; i < 9; i += 3) {
          // Loop through columns
          for (let j = 0; j < 9; j += 3) {
            const matrix = [];
            // Loop to create 3x3 matrix
            for (let row = i; row < i + 3; row++) {
              for (let col = j; col < j + 3; col++) {
                matrix.push({ x: row, y: col });
              }
            }
            matrices.push(matrix);
          }
        }
  
        return matrices;
      },
    };
    const actions = {
      setBoard({ state }, position) {
        state.board[position.x][position.y] = position.value;
      },
      activeNote({ state }) {
        console.log(state);
        state.isActiveNote.value = !state.isActiveNote.value;
      },
      createAroundCell({state}, position) {
          const array = [];
          if (position.x && position.y) {
            for (let y = 0; y < 9; y++) {
              if (y !== position.y) {
                array.push({ x: position.x, y: y });
              }
            }
      
            for (let x = 0; x < 9; x++) {
              if (x !== position.x) {
                array.push({ x: x, y: position.y });
              }
            }
          }
          state.aroundCell = array;
      },
      checkAroundSelected({state}, position) {
          return state.aroundCell.some((item) => JSON.stringify(item) === JSON.stringify({ x: position.x, y: position.y })
          );
      },
      checkCellRight({state}, position) {
          return state.boardRight().some((item) => JSON.stringify(item) === JSON.stringify({ x: position.x, y: position.y }));
      },
  
      checkCellBottom({state}, position) {
          return state.boardBottom().some((item) => JSON.stringify(item) === JSON.stringify({x: position.x, y: position.y }));
      },
      
      checkCellTop({state}, position) {
         return state.boardTopBorder().some((item) => JSON.stringify(item) === JSON.stringify({ x: position.x, y: position.y }));
      },
  
      checkCellLeft({state}, position) {
         return state.boardLeftBorder().some((item) => JSON.stringify(item) === JSON.stringify({ x: position.x, y: position.y }));
      },
      checkHighlightCell({state}, position) {
          if (position.selectingX && position.selectingY) {
            const resultArray = state.boardHightlightAround().find((subArray) =>
                subArray.some((obj) => obj.x === position.selectingX && obj.y === position.selectingY)
            );
            return resultArray.some((item) => JSON.stringify(item) === JSON.stringify({ x: position.x, y: position.y }));
          }
          return false;
      }
    };
  
    const store = new Store({ state, actions })
    store.on("update", null, () => console.log("test change state"));
    return store;
  }