import React from "react";
import Visualization from "../Visualization";
import Button from "../Button";
import InfoModal from "../InfoModal";

import css from "./Main.module.css";

const emptyDiff = {
  add: {
    nodes: [],
    edges: []
  },
  remove: {
    nodes: [],
    edges: []
  },
  stack: []
};

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      diff: Object.assign({}, emptyDiff),
      commands: [],
      isModalOpened: false,
      error: null
    };
    this.value = initialCode;
  }

  handleChange = event => {
    this.value = event.target.value;
  };
  handleSubmit = event => {
    event.preventDefault();
    fetch("http://gmachine-api.herokuapp.com/", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ code: this.value })
    })
      .then(response => response.json())
      .then(coms => {
        //TODO Clean graph and stack
        this.setState({ commands: coms.diff, error: coms.err, counter: 0 });
        console.log(coms);
        if (!coms.length && coms.err) {
          alert(coms.err);
        }
      })
      .catch(e => alert(e));
  };

  openModal = () => this.setState({ isModalOpened: true });

  closeModal = () => this.setState({ isModalOpened: false });

  increase = () =>
    this.setState(({ counter, commands, error }) => {
      if (counter !== commands.length) {
        return {
          diff: commands[counter],
          counter: counter + 1
        };
      }

      const diff = Object.assign({}, emptyDiff);
      if (commands.length > 1) {
        if (error) {
          alert(error);
        }
        diff.stack = commands[commands.length - 1].stack;
      }
      return { diff };
    });

  decrease = () =>
    this.setState(state => {
      if (state.counter > 0) {
        state.counter -= 1;
        const { add, remove } = state.commands[state.counter];
        let stack = [];
        if (state.counter > 0) {
          stack = state.commands[state.counter - 1].stack;
        }
        state.diff = { remove: add, add: remove, stack };
        return state;
      }
      return {
        diff: Object.assign({}, emptyDiff)
      };
    });

  render() {
    const { commands, diff, counter, isModalOpened } = this.state;

    return (
      <>
        <main
          onClick={isModalOpened ? this.closeModal : () => {}}
          className={css.container}
        >
          <Visualization diff={diff} counter={counter} commands={commands} />
          <div className={css.formContainer}>
            <form
              className={css.form}
              onSubmit={this.handleSubmit}
              onChange={this.handleChange}
            >
              <textarea defaultValue={this.value} className={css.textarea} />
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
                  disabled={!commands.length || counter === commands.length}
                  onClick={this.increase}
                >
                  +
                </Button>
                <Button
                  type="button"
                  disabled={counter === 0}
                  onClick={this.decrease}
                  className={css.lessButton}
                >
                  -
                </Button>
              </div>
            </form>
          </div>
        </main>
        <InfoModal handleClose={this.closeModal} isOpened={isModalOpened} />
      </>
    );
  }
}

const initialCode = "BEGIN\nPUSHINT 2\nPUSHINT 2\nMUL\nEND"

export default Main;
