import React from "react";
import { IPathSelectProps } from "../../../@types/components/atoms/IPathSelectProps";
import { Select } from "antd";

const pathSelectStyle: React.CSSProperties = { width: 200, textAlign: "left" };

const PathSelectAtom: React.FC<IPathSelectProps> = (props) => {
  return (
    <Select
      style={pathSelectStyle}
      size="small"
      variant="borderless"
      popupMatchSelectWidth={false}
      showSearch
      defaultValue={props.fPath}
      placeholder="Select a Path"
      optionFilterProp="label"
      onChange={(fPath: string) => {
        props.events.onChange({ fPath });
      }}
      onSearch={props.events.onSearch}
      options={props.options}
    />
  );
};

export default PathSelectAtom;
