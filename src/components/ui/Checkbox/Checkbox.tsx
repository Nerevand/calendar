import React from "react";
import MuiCheckbox, {
  CheckboxProps as MuiCheckboxProps,
} from "@material-ui/core/Checkbox";

export interface CheckboxProps extends MuiCheckboxProps {}

function Checkbox(props: CheckboxProps) {
  return <MuiCheckbox {...props} />;
}

export default Checkbox;
