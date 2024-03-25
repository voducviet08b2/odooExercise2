import {owl} from "@odoo/owl";
const {Component} = owl
const { useRef, useState, useDispatch, useStore } = owl.hooks;


export class Header extends Component {
    static template = "Header";
    static props = ["error"];
    minutes = 0;
    seconds = 0;
    setup() {
        this.state = useState({
            time: 0
        })
        this.interval = setInterval(this.updateCounter.bind(this), 1000);
    }
    updateCounter() {
        this.seconds++;
    
        if (this.seconds === 60) {
            this.minutes++;
            this.seconds = 0;
        }

        const timeDisplay = this.minutes ? this.minute : "00" + ':' + this.seconds;
        this.state.time = timeDisplay
    }
}
