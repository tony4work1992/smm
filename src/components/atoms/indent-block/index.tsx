import React from "react";

const IndentBlockAtom: React.FC<{ level: number }> = (props) => {
  return <>{new Array(props.level).fill(<div style={{ width: 20 }}></div>)}</>;
};

export default IndentBlockAtom;
