import React from 'react';
import Visualization from './Visualization.js';
import css from './Main.module.css';



class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          value: initialCode,
          commands: [],
        };
    };
    handleSubmit = (event) =>  {
        event.preventDefault();
        this.setState({commands: initialState.commands});
    };
    render(){
      return (
          <div className={css.container}>
            <Visualization commands={this.state.commands} />
            <div className={css.textarea}>
              <form className={css.field} onSubmit={this.handleSubmit}>
                <textarea className={css.field} value={this.state.value} disabled/>
                <input type="submit" value="Отправить" />
              </form>
              <button onClick={this.props.handleClick} className={css.button}>
                Назад
              </button>
            </div>
          </div>
      )
    };
}

const initialState = {
    commands: [
        {
            command: "PUSHINT 3",
            add: {
                nodes: [{id: "21", label: "3"}],
                edges: [],
            },
            remove: {
                nodes: [],
                edges: [],
            },
            stack: ["3"],
        },
        {
            command: "PUSHINT 3",
            add: {
                nodes: [{id: "22", label: "3"}],
                edges: [],
            },
            remove: {
                nodes: [],
                edges: [],
            },
            stack: ["3", "3"],
        },
        {
            command: "PUSHFUN +",
            add: {
                nodes: [{id: "+" , label: "+"}],
                edges: [],
            },
            remove: {
                nodes: [],
                edges: [],
            },
            stack: ["+", "3", "3"],
        },
        {
            command: "MKAP",
            add: {
                nodes: [{id: "a2", label: "@"}],
                edges: [
                    {from: "a2", to: "+" },
                    {from: "a2", to: "22"},
                ],
            },
            remove: {
                nodes: [],
                edges: [],
            },
            stack: ["@", "3"],
        },
        {
            command: "MKAP",
            add: {
                nodes: [{id: "a1", label: "@"}],
                edges: [
                    {from: "a1", to: "a2" },
                    {from: "a1", to: "21"},
                ],
            },
            remove: {
                nodes: [],
                edges: [],
            },
            stack: ["@"],
        },
        {
            command: "PASS",
            add: {
                nodes: [],
                edges: [],
            },
            remove: {
                nodes: [],
                edges: [],
            },
            stack: ["@"],
        },
        {
            command: "PASS",
            add: {
                nodes: [],
                edges: [],
            },
            remove: {
                nodes: [],
                edges: [],
            },
            stack: ["@"],
        },
        {
            command: "PASS",
            add: {
                nodes: [],
                edges: [],
            },
            remove: {
                nodes: [],
                edges: [],
            },
            stack: ["@"],
        },
        {
            command: "PASS",
            add: {
                nodes: [],
                edges: [],
            },
            remove: {
                nodes: [],
                edges: [],
            },
            stack: ["@"],
        },
    ],
};
const initialCode = initialState.commands.map(x => x.command).join("\n");
export default Main;
