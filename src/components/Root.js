import { owl } from "@odoo/owl";

const { Component } = owl;
const {
  useStore,
  useDispatch,
  useGetters,
  useState,
} = owl.hooks;
import { MenuTitle } from "./Sudoku/menu";
import { CellSudoku } from "./Sudoku/cell";
import { PlayerSudoku } from "./Sudoku/player";

export class Root extends Component {
  static template = "Sudoku";
  static components = { MenuTitle, CellSudoku, PlayerSudoku };
  getters = useGetters();
  board = useStore((state) => state.board);
  isActiveNote = useStore((state) => state.isActiveNote)
  dispatch = useDispatch();

  setup() {
    this.state = useState({
      selectingX: null,
      selectingY: null,
      moves: [],
      error: 0,
      numberArr: [],
    });
  }

  // khi muốn thêm component con, chúng ta phải tham chiếu đến nó
  //   static components = { Task }
  // inputRef được định nghĩa như là 1 class field, tương đương với khai báo trong constructor.
  // nó chỉ ra rằng owl sẽ tham chiều với t-ref keyword.
  // tasks = useState([]);
  // tasks = useStore((state) => state.tasks);
  // dispatch = useDispatch();

  handleSelect(x, y) {
    this.state.selectingX = x;
    this.state.selectingY = y;
    this.state.numberArr = [];
    this.state.moves = [];
    this.dispatch("createAroundCell", {x, y});
  }

  selectNumber(value) {
    if (this.state.selectingX == null && this.state.selectingY == null) {
      return;
    }
    if (!this.isActiveNote.value) {
      this.dispatch("setBoard", {
        x: this.state.selectingX,
        y: this.state.selectingY,
        value,
      });
      this.state.moves.push({
        x: this.state.selectingX,
        y: this.state.selectingY,
      });
    } else {
      const length = this.state.moves.length;

      if (
        this.state.moves.length > 0 &&
        (this.state.selectingX !== this.state.moves[length - 1].x ||
          this.state.selectingY !== this.state.moves[length - 1].y)
      ) {
        this.state.numberArr = [];
      }
      if (this.state.numberArr.includes(value)) {
        const index = this.state.numberArr.findIndex(
          (number) => number === value
        );
        this.state.numberArr.splice(index, 1);
      } else {
        this.state.numberArr.push(value);
      }
      this.dispatch("setBoard", {
        x: this.state.selectingX,
        y: this.state.selectingY,
        value: this.state.numberArr,
      });
      this.state.moves.push({
        x: this.state.selectingX,
        y: this.state.selectingY,
      });
    }
  }

  checkSelected(x, y) {
    return this.state.selectingX == x && this.state.selectingY == y;
  }

  removeCellValue() {
    this.selectNumber(0);
  }

  undoMove() {
    const lengthArr = this.state.moves.length;
    if (lengthArr > 0 && this.state.error < 3) {
      this.state.error++;
      this.state.board[this.state.moves[lengthArr - 1].x][
        this.state.moves[lengthArr - 1].y
      ] = 0;
      this.state.moves.pop();
    }
  }
}
