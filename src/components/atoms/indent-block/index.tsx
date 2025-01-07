import React from "react";

const IndentBlockAtom: React.FC<{ level: number }> = (props) => {
  return (
    <>
      {new Array(props.level).fill(1).map((_, index) => (
        <div key={index} style={{ width: 20 }}></div>
      ))}
    </>
  );
};

export default IndentBlockAtom;
