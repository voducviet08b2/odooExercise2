import { owl } from "@odoo/owl";
const { Component } = owl;
const { useRef, useState, useDispatch, useStore, useGetters } = owl.hooks;

export class PlayerSudoku extends Component {
  static template = "PlayerSudoku";
  static props = ["onSelect", "removeCellValue", "undoMove"];
  dispatch = useDispatch();

  isNoteActivated = useStore((state) => state.isActiveNote);
  playerBoard = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  passNumber(x) {
    this.props.onSelect(x);
  }
}
