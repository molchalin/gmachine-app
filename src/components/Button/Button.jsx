import React from "react";
import classNames from "classnames";

import css from "./Button.module.css";

const Button = ({ className, children, ...props }) => (
  <button className={classNames(css.button, className)} {...props}>
    {children}
  </button>
);

export default Button;
