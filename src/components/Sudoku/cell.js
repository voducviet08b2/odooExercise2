import { owl } from "@odoo/owl";
const { Component } = owl;
const { useRef, useState, useDispatch, useStore } = owl.hooks;

export class CellSudoku extends Component {
  static template = "CellSudoku";
  static props = ["x", "y", "value", "isSelected", "onSelect", "isAroundCell", "isCellRight", "isCellBottom", "isCellTop", "isCellLeft","isHighlightCell"];
  displayNumber = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]
  dispatch = useDispatch()
  setup() {
    this.state = useState({
        fixed: false
    })
  }
  clickBoardBlock() {
    if(this.props.value == 0 || Array.isArray(this.props.value) || this.state.fixed) {
        this.props.onSelect(this.props.x, this.props.y);
        this.state.fixed = true
    }
  }
}
