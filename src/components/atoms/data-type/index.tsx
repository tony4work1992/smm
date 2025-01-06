import { SettingOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps, Space, Tag } from "antd";
import React from "react";
import { IDataTypeProps } from "../../../@types/components/atoms/IDataTypeProps";

const originalStyle: React.CSSProperties = {
  height: 25,
  marginInlineEnd: 0,
  verticalAlign: "middle",
  borderTop: 0,
  borderBottom: 0,
  borderRight: 0,
  borderRadius: 0,
  borderLeft: 0,
  fontWeight: "bold",
  background: "rgba(255, 255, 255, 0)",
  transition: "color 0.25s ease-out, background 0.25s ease-out",
};

const DataTypeAtom: React.FC<IDataTypeProps> = (props) => {
  const menus: MenuProps["items"] = [
    {
      key: "List",
      label: "List",
      icon: <SettingOutlined style={{ paddingTop: 2 }} />,
      extra: "⌘L",
      onClick: (e) => {
        props.onChange({ update: { datatype: e.key, defaultValue: "" } });
      },
    },
    {
      key: "Object",
      label: "Object",
      icon: <SettingOutlined style={{ paddingTop: 2 }} />,
      extra: "⌘S",
      onClick: (e) => {
        props.onChange({ update: { datatype: e.key, defaultValue: "" } });
      },
    },
    {
      key: "String",
      label: "String",
      icon: <SettingOutlined style={{ paddingTop: 2 }} />,
      extra: "⌘S",
      onClick: (e) => {
        props.onChange({ update: { datatype: e.key, defaultValue: "" } });
      },
    },
    {
      key: "Number",
      label: "Number",
      icon: <SettingOutlined style={{ paddingTop: 2 }} />,
      extra: "⌘S",
      onClick: (e) => {
        props.onChange({ update: { datatype: e.key, defaultValue: "0" } });
      },
    },
    {
      key: "Boolean",
      label: "Boolean",
      icon: <SettingOutlined style={{ paddingTop: 2 }} />,
      extra: "⌘S",
      onClick: (e) => {
        props.onChange({ update: { datatype: e.key, defaultValue: "false" } });
      },
    },
  ];

  const isSelected = props.selected?.fPath === props.fPath;

  return (
    <Tag
      style={{
        ...originalStyle,
        color: (isSelected || props.isSelecting) ? "white" : "initial"
      }}
      key={`${props.datatype}_${props.fPath}`}
    >
      <Dropdown
        trigger={["contextMenu"]}
        menu={{ items: menus }}
        open={props.open}
      >
        <Space>
          <SettingOutlined style={{ paddingTop: 2 }} />
          {props.datatype}
        </Space>
      </Dropdown>
    </Tag>
  );
};
export default DataTypeAtom;
