import { InputNumber } from "antd";
import React from "react";
import INumberInputProps from "../../../types/components/atoms/INumberInputProps";

const NumberInputAtom: React.FC<INumberInputProps> = (props) => {
  return (
    <InputNumber
      variant="filled"
      size="small"
      value={props.value}
      min={0}
      onChange={(value) => {
        props.onNumberChange(value);
      }}
    />
  );
};

export default NumberInputAtom;
