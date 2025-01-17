import { Popover, Space } from "antd";
import React from "react";
import { ISettingProps } from "../../../types/components/molecules/ISettingProps";
import SettingButtonAtom from "../../atoms/setting-button";
import SettingContentMolecule from "./content";

const SettingMolecule: React.FC<ISettingProps> = (props) => {
  return (
    <Popover
      color="aliceblue"
      content={<SettingContentMolecule {...props} />}
      onOpenChange={(open, e) => {
        props.onOpenChange(open, e);
      }}
      placement="bottomRight"
      trigger="click"
      style={{ border: '1px solid' }}
    >
      <Space>
        <SettingButtonAtom {...props} />
      </Space>
    </Popover>
  );
};

export default SettingMolecule;
