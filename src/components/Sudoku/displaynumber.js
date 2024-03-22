import { owl } from "@odoo/owl";
const { Component } = owl;
const { useRef, useState, useDispatch, useStore, useGetters } = owl.hooks;

export class DisplayNumber extends Component {
  static template = "DisplayNumber";
  static props = ["onSelect", "removeCellValue", "undoMove"];
  dispatch = useDispatch();

  isActiveNote = useStore((state) => state.isActiveNote);
  playerBoard = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  passNumber(x) {
    this.props.onSelect(x);
  }
}
