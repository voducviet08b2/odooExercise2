import { owl } from "@odoo/owl";

const { Component } = owl;
const { useStore, useDispatch, useGetters, useState } = owl.hooks;
import { MenuTitle } from "./Sudoku/menu";
import { CellSudoku } from "./Sudoku/cell";
import { DisplayNumber } from "./Sudoku/displaynumber";

export class Root extends Component {
  static template = "Sudoku";
  static components = { MenuTitle, CellSudoku, DisplayNumber };
  getters = useGetters();
  board = useStore((state) => state.board);
  isNoteActivated = useStore((state) => state.isActiveNote);
  history =  useStore((state) => state.history)
  state = useStore((state) => ({
    selectingX: state.selectingX,
    selectingY: state.selectingY,
  }));
  moves = useStore((state) => state.moves);
  dispatch = useDispatch();
  setup() {
    this.state = useState({
      // moves: [],// Lưu số nước đi để hoàn tác
      error: 0,
      // numberNoteArray: [],
    });
  }

  handleSelect(x, y) {
    this.dispatch("setPositionCurrent", { x, y });
    this.dispatch("createAroundCell", { x, y });
  }

  selectNumber(value) {
    if (this.state.selectingX == null || this.state.selectingY == null) {
      return;
    }
    if (!this.isNoteActivated.value) {
      this.dispatch(
        "setBoard",
        {
          x: this.state.selectingX,
          y: this.state.selectingY,
        },
        value
      );
      this.dispatch("addHistory", _.cloneDeep(this.board))
      // this.dispatch("setMove", {
      //   x: this.state.selectingX,
      //   y: this.state.selectingY,
      // });
    } else {
      let numberNoteArray = [];
      if (
        Array.isArray(this.board[this.state.selectingX][this.state.selectingY])
      ) {
        numberNoteArray = this.board[this.state.selectingX][this.state.selectingY];
      }
      if (numberNoteArray.includes(value)) {
        const index = numberNoteArray.findIndex((number) => number === value);
        numberNoteArray.splice(index, 1);
      } else {
        numberNoteArray.push(value);
      }
      this.dispatch(
        "setBoard",
        {
          x: this.state.selectingX,
          y: this.state.selectingY,
        },
        _.cloneDeep(numberNoteArray)
      );
      this.dispatch("addHistory", _.cloneDeep(this.board))
    }
  }

  checkSelected(x, y) {
    return this.state.selectingX == x && this.state.selectingY == y;
  }

  removeCellValue() {
    this.selectNumber(0);
  }

  undoMove() {
    // const lengthArr = this.moves.length;
    // if (lengthArr > 0 && this.state.error < 3) {
      // this.state.error++;
      // this.dispatch(
      //   "setBoard",
      //   {
      //     x: this.moves[lengthArr - 1].x,
      //     y: this.moves[lengthArr - 1].y,
      //   },
      //   0
      // );
      // this.dispatch("removeMove");
    // }
    
    this.dispatch("undoBoard", this.history[this.history.length - 2])
    console.log(this.history);
    this.dispatch("removeHistory", this.board)
  }
}
