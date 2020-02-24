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

const API_URL = "http://localhost:8080";
const DEFAULT_CODE = "BEGIN\nPUSHINT 2\nPUSHINT 2\nMUL\nEND";
const DEFAULT_LAMBDA_CODE = "(\\x.((+ 2) x) 13)";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.textArea = React.createRef();
    this.state = {
      counter: 0,
      diff: { ...emptyDiff },
      commands: [],
      isModalOpened: false,
      error: null,
      isGCode: true,
      gCode: DEFAULT_CODE,
      lambdaCode: DEFAULT_LAMBDA_CODE
    };
  }

  handleChange = () => {
    this.setState(({ isGCode }) =>
      isGCode
        ? { gCode: this.textArea.current.value }
        : { lambdaCode: this.textArea.current.value }
    );
  };
  handleSubmit = event => {
    const { isGCode, gCode, lambdaCode, counter } = this.state;
    event.preventDefault();
    fetch(API_URL + (isGCode ? "/gcode" : "/lambda"), {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ code: isGCode ? gCode : lambdaCode })
    })
      .then(response => response.json())
      .then(coms => {
        let cnt = counter;
        let f = () => {
          if (cnt) {
            cnt--;
            setTimeout(() => this.decrease(null, f), 10);
          } else {
            this.setState(({ isGCode }) => {
              if (isGCode) {
                if (!coms.diff.length && coms.err) {
                  alert(coms.err);
                }
                return {
                  commands: coms.diff,
                  error: coms.err,
                  counter: 0,
                  diff: { ...emptyDiff }
                };
              } else {
                return { isGCode: true, gCode: coms.result.join("\n") };
              }
            });
          }
        };
        f();
      })
      .catch(e => alert(e));
  };

  changeMode = () =>
    this.setState(({ isGCode }) => {
      return { isGCode: !isGCode };
    });

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

  decrease = (_, cb = () => {}) =>
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
    }, cb);

  render() {
    const {
      commands,
      diff,
      counter,
      isModalOpened,
      isGCode,
      gCode,
      lambdaCode
    } = this.state;

    return (
      <>
        <main
          onClick={isModalOpened ? this.closeModal : () => {}}
          className={css.container}
        >
          <Visualization diff={diff} counter={counter} commands={commands} />
          <div className={css.formContainer}>
            <form className={css.form} onSubmit={this.handleSubmit}>
              <textarea
                onChange={this.handleChange}
                value={isGCode ? gCode : lambdaCode}
                className={css.textarea}
                ref={this.textArea}
              />
              <div className={css.buttons}>
                <Button className={css.button} title="Отправить" type="submit">
                  Отправить
                </Button>
                <Button
                  type="button"
                  onClick={this.changeMode}
                  className={css.button}
                >
                  {isGCode ? "G" : "λ"}
                </Button>
                <Button title="Справка" type="button" onClick={this.openModal}>
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

export default Main;
