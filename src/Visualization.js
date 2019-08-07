import React from 'react';
import css from './Main.module.css';
import Stack from './Stack.js';
import Graph from './Graph.js';

const emptyDiff = {
    add:{
        nodes: [],
        edges: [],
    },
    remove:{
        nodes: [],
        edges: [],
    },
    stack: [],
};

const WINDOWSIZE = 5;
const HALFWINDOW = Math.floor(WINDOWSIZE/2);

class Visualization extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0,
            diff: emptyDiff,
        };
    };

    render() {
       return (
            <div className={css.visualization}>
              <div className={css.control}>
                  <button onClick={this.increase} className={css.anotherButton}>
                      +
                  </button>
                  <button onClick={this.decrease} className={css.anotherButton2}>
                      -
                  </button>
                  <div className={css.commands}>
                    {this.currentCommands()}
                  </div>
               </div>
              <Graph diff={this.state.diff} />
              <Stack stack={this.state.diff.stack} />
            </div>
       )
    };
    increase = () => {
        this.setState((state, props) => {
            if (state.counter !== props.commands.length) {
                state.diff = props.commands[state.counter];
                state.counter += 1;
            } else {
                state.diff = Object.assign({}, emptyDiff);
                if (props.commands.length > 1) {
                    state.diff.stack = props.commands[props.commands.length - 1].stack;
                }
            }
            return state;
        });
    }
    decrease = () => {
        this.setState((state, props) => {
            if (state.counter > 0) {
                state.counter -= 1;
                const {add, remove} = props.commands[state.counter];
                let stack = [];
                if (state.counter > 0) {
                    stack = props.commands[state.counter - 1].stack;
                }
                state.diff = {remove: add, add: remove, stack: stack};
            } else {
                state.diff = Object.assign({}, emptyDiff);
            }
            return state;
        });
    }
    currentCommands = () => {
        const size = this.props.commands.length;
        const idx = this.state.counter - 1;
        let begin, end = (0, 0);

        if (idx <= HALFWINDOW) {
            begin = 0;
            end = begin + WINDOWSIZE;
        } else if (size - idx <= HALFWINDOW) {
            begin = size - WINDOWSIZE;
            end = size;
        } else {
            begin = idx - HALFWINDOW;
            end = idx + HALFWINDOW + 1;
        }
        return this.props.commands.
            map(c => c.command).
            map((c, i) => i === idx ? "-> " + c : "   " + c).
            slice(begin, end).
            map(c => this.renderLine(c));
    }

    renderLine = (command) => {
        return (
            <>
            <div className={css.command}>
                {command}
            </div>
            </>);
    }
}


export default Visualization;
