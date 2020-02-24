import React from "react";
import classNames from "classnames";
import Stack from "../Stack";
import Graph from "../Graph";

import css from "./Visualization.module.css";

const ITEM_HEIGHT = 27;

class Visualization extends React.Component {
  state = { diff: this.props.diff };
  static getDerivedStateFromProps({ diff }) {
    return { diff };
  }
  render() {
    const { diff } = this.state;
    const { commands, counter } = this.props;
    return (
      <div className={css.container}>
        <Graph diff={diff} />
        {diff.stack && diff.stack.length ? <Stack stack={diff.stack} /> : null}
        <div className={css.commandsContainer}>
          <div
            className={css.commands}
            style={{ bottom: (counter - 1) * ITEM_HEIGHT }}
          >
            {commands.map(({ command }, index) => (
              <div
                key={`${command}${index}`}
                className={classNames(css.command, {
                  [css.active]: counter - 1 === index
                })}
              >
                {command}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Visualization;
