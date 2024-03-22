import { owl } from "@odoo/owl";
import "./app.scss";

const { Store } = owl;
import {
  originalBoard,
  boardBottom,
  boardLeftBorder,
  boardRight,
  boardTopBorder,
} from "./constant";

export function createTaskStore() {
  const state = {
    board: _.cloneDeep(originalBoard),
    isActiveNote: { value: false },
    aroundCell: [], // lưu vị trí các cell dọc ngang quanh cell được chọn
    selectingX: null,
    selectingY: null,
    moves: [], // lưu các nước đi để hoàn tác

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
    setBoard({ state }, position, fillNumber) {
      state.board[position.x][position.y] = fillNumber;
    },
    activeNoteMode({ state }) {
      state.isActiveNote.value = !state.isActiveNote.value;
    },
    createAroundCell({ state }, position) {
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
    checkAroundSelected({ state }, position) {
      return state.aroundCell.some(
        (item) => item.x === position.x && item.y === position.y
      );
    },
    checkCellRight({ state }, position) {
      return boardRight.some(
        (item) => item.x === position.x && item.y === position.y
      );
    },

    checkCellBottom({ state }, position) {
      return boardBottom.some(
        (item) => item.x === position.x && item.y === position.y
      );
    },

    checkCellTop({ state }, position) {
      return boardTopBorder.some(
        (item) => item.x === position.x && item.y === position.y
      );
    },

    checkCellLeft({ state }, position) {
      return boardLeftBorder.some(
        (item) => item.x === position.x && item.y === position.y
      );
    },
    checkHighlightCell({ state }, position) {
      if (position.selectingX && position.selectingY) {
        const resultArray = state
          .boardHightlightAround()
          .find((subArray) =>
            subArray.some(
              (obj) =>
                obj.x === position.selectingX && obj.y === position.selectingY
            )
          );
        return resultArray.some(
          (item) => item.x === position.x && item.y === position.y
        );
      }
      return false;
    },
    setPositionCurrent({ state }, position) {
      state.selectingX = position.x;
      state.selectingY = position.y;
    },
    setMove({ state }, position) {
      state.moves.push(position);
    },
    removeMove({ state }) {
      state.moves.pop();
    },
  };

  const store = new Store({ state, actions });
  // store.on("update", null, () => console.log("test change state"));
  return store;
}
