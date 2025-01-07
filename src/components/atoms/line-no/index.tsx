import React from "react";
import ILineNo from "../../../types/components/atoms/ILineNo";

const LineNo: React.FC<ILineNo> = (props) => {
  return (
    <div
      className="item-level-wrapper"
      style={{
        width: 20,
        height: "inherit",
        backgroundColor: "#0f6fac",
        color: "white",
        padding: "0px 5px",
      }}
    >
      {props.index + 1}
    </div>
  );
};

export default LineNo;
