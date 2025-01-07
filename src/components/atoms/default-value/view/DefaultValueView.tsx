import { Tag } from "antd";
import React from "react";
import { useStringUtilities } from "../../../../hooks/useStringUtilities";
import { DefaultValueViewProps } from "../../../../types/components/atoms/IDefaultValueProps";

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
  const stringUtilities = useStringUtilities();
  const isSelected = props.selected?.fPath === props.fPath;

  return (
    <Tag
      style={{
        ...originalStyle,
        width: `${stringUtilities.trim(props.fieldname, 25).length + 2}ch`,
        color: isSelected || props.isSelecting ? "white" : "initial",
      }}
      defaultValue={props.defaultValue}
      onDoubleClick={() => {
        props.onDefaultValueDoubleClick();
      }}
    >
      {stringUtilities.trim(props.defaultValue, 25)}
    </Tag>
  );
};
export default DefaultValueView;
