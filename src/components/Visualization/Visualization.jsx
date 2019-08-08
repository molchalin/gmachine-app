import React from 'react';
import classNames from "classnames";
import Stack from '../Stack';
import Graph from '../Graph';

import css from './Visualization.module.css';

const ITEM_HEIGHT = 27;

const Visualization = ({
    commands,
    counter,
    diff,
}) => (
    <div className={css.container}>
        <Graph diff={diff} />
        {diff.stack && diff.stack.length ? <Stack stack={diff.stack} /> : null}
        <div className={css.commandsContainer}>
            <div className={css.commands} style={{ bottom: (counter - 1) * ITEM_HEIGHT }}>
                {commands.map(({ command }, index) => (
                    <div
                        key={`${command}${index}`}
                        className={classNames(css.command, {
                            [css.active]: counter === index
                        })}
                    >
                        {command}
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default Visualization;
