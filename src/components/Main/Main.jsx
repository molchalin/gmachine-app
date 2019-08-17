import React from 'react';
import Visualization from '../Visualization';
import Button from "../Button";
import InfoModal from "../InfoModal";

import css from './Main.module.css';

const emptyDiff = {
    add: {
        nodes: [],
        edges: [],
    },
    remove: {
        nodes: [],
        edges: [],
    },
    stack: [],
};

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0,
            diff: Object.assign({}, emptyDiff),
            value: initialCode,
            commands: [],
            isModalOpened: false
        };
    };

    handleSubmit = event =>  {
        event.preventDefault();
        this.setState(initialState);
    };

    openModal = () => this.setState({ isModalOpened: true });

    closeModal = () => this.setState({ isModalOpened: false });

    increase = () => this.setState(({ counter, commands }) => {
        if (counter !== commands.length) {
            return {
                diff: commands[counter],
                counter: counter + 1,
            }
        }

        const diff = Object.assign({}, emptyDiff);
        if (commands.length > 1) {
            diff.stack = commands[commands.length - 1].stack;
        }
        return { diff }
    })

    decrease = () => this.setState((state) => {
        if (state.counter > 0) {
            state.counter -= 1;
            const {add, remove} = state.commands[state.counter];
            let stack = [];
            if (state.counter > 0) {
                stack = state.commands[state.counter - 1].stack;
            }
            state.diff = { remove: add, add: remove, stack };
            return state;
        }
        return {
            diff: Object.assign({}, emptyDiff)
        }
    });

    render() {
        const { value, commands, diff, counter, isModalOpened } = this.state;

        return (
            <>
                <main onClick={isModalOpened ? this.closeModal : () => {}} className={css.container}>
                    <Visualization diff={diff} counter={counter} commands={commands} />
                    <div className={css.formContainer}>
                    <form className={css.form} onSubmit={this.handleSubmit}>
                        <textarea defaultValue={value} className={css.textarea} />
                        <div className={css.buttons}>
                            <Button className={css.button} title="Отправить" type="submit">
                                Отправить
                            </Button>
                            <Button
                                title="Справка"
                                type="button"
                                onClick={this.openModal}
                                className={css.button}
                            >
                                Справка
                            </Button>
                            <Button
                                type="button"
                                disabled={!commands.length || counter === commands.length - 1}
                                onClick={this.increase}
                            >
                                +
                            </Button>
                            <Button type="button" disabled={counter === 0} onClick={this.decrease} className={css.lessButton}>
                                -
                            </Button>
                        </div>
                    </form>
                    </div>
                </main>
                <InfoModal handleClose={this.closeModal} isOpened={isModalOpened} />
            </>
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
