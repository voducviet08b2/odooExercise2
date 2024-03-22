import {owl} from "@odoo/owl";
const {Component} = owl
const { useRef, useState, useDispatch, useStore } = owl.hooks;


export class MenuTitle extends Component {
    static template = "MenuTitle";
    static props = ["error"];
}
