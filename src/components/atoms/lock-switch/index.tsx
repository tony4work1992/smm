import React from "react";
import ILockSwitchProps from "../../../types/components/atoms/ILockSwitchProps";
import { LockFilled, UnlockFilled } from "@ant-design/icons";
import { Switch } from "antd";

const LockSwitch: React.FC<ILockSwitchProps> = (props) => {
  return (
    <>
      {props.resizeable ? (
        <UnlockFilled style={{ color: "#b3b3b3", marginRight: 5 }} />
      ) : (
        <LockFilled style={{ color: "#b3b3b3", marginRight: 5 }} />
      )}
      <Switch
        style={{
          background: props.resizeable ? "#00cc00" : "#ff9933",
          color: "#ffffff",
        }}
        checkedChildren={
          <span style={{ fontWeight: "bold", color: "#ffffff" }}>◯</span>
        }
        unCheckedChildren={
          <span style={{ fontWeight: "bold", color: "#ffffff" }}>I</span>
        }
        checked={props.resizeable}
        onChange={(resizeable, e) => {
          props.onLockChange(resizeable, e);
        }}
      />
    </>
  );
};

export default LockSwitch;
