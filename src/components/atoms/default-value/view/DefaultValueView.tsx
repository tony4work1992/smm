import { Tag } from "antd";
import React from "react";
import { DefaultValueViewProps } from "../../../../@types/components/atoms/IDefaultValueProps";

const originalStyle: React.CSSProperties = {
  height: 25,
  marginInlineEnd: 0,
  verticalAlign: "middle",
  borderTop: 0,
  borderBottom: 0,
  borderRight: 0,
  borderRadius: 0,
  borderLeft: 0,
  background: "rgba(255, 255, 255, 0)",
  paddingLeft: 0,
  transition: "color 0.25s ease-out, background 0.25s ease-out",
};

const DefaultValueView: React.FC<DefaultValueViewProps> = (props) => {
  const isSelected = props.selected?.fPath === props.fPath;

  return (
    <Tag
      style={{ ...originalStyle, color: isSelected ? "white" : "initial" }}
      defaultValue={props.defaultValue}
      onDoubleClick={() => {
        props.onDoubleClick({ update: { isDefaultValueEdit: true } });
      }}
    >
      {props.defaultValue}
    </Tag>
  );
};
export default DefaultValueView;
