import { Select } from "antd";
import React from "react";
import { IPathSelectProps } from "../../../types/components/atoms/IPathSelectProps";

const pathSelectStyle: React.CSSProperties = {
  width: "100%",
  textAlign: "left"
};

const PathSelectAtom: React.FC<IPathSelectProps> = (props) => {
  return (
    <Select
      style={{ ...pathSelectStyle }}
      size="small"
      variant="outlined"
      popupMatchSelectWidth={false}
      status={props.status}
      showSearch
      // defaultValue={props.fPath}
      value={props.fPath}
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
