import {owl} from "@odoo/owl";
const {Component} = owl
const { useRef, useState, useDispatch, useStore } = owl.hooks;


export class Task extends Component {
    static template = "TodoTask";
    static props = ["task"];
    dispatch = useDispatch();  
}