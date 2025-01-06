import { SettingOutlined } from "@ant-design/icons";
import { Dropdown, Input, MenuProps, Tag } from "antd";
import React from "react";
import { DefaultValueEditProps } from "../../../../@types/components/atoms/IDefaultValueProps";
import useAutoFocus from "../../../../hooks/useAutoFocus";

const originalStyle: React.CSSProperties = {
  paddingLeft: 0,
  paddingTop: 2,
  minWidth: 20,
  width: "10ch",
  height: 25,
  marginInlineStart: 5,
  verticalAlign: "middle",
  border: "1px dashed green",
  borderRadius: 0,
  // color: ThemeStyles.TEXT_COLOR_LEVEL_1,
};

const DefaultValueEdit: React.FC<DefaultValueEditProps> = (props) => {
  const selfRef = useAutoFocus();
  const datatype = props.datatype?.toLocaleLowerCase();

  const menus: MenuProps["items"] = React.useMemo(() => {
    return [
      {
        key: "null",
        label: "NULL",
        icon: <SettingOutlined style={{ paddingTop: 2 }} />,
        extra: "⌘N",
        onClick: (e) => {
          props.confirm({
            update: {
              defaultValue: e.key || "",
              isDefaultValueEdit: false,
            },
          });
        },
      },
      {
        key: "true",
        label: "true",
        icon: <SettingOutlined style={{ paddingTop: 2 }} />,
        extra: "⌘T",
        onClick: (e) => {
          props.confirm({
            update: {
              defaultValue: e.key || "",
              isDefaultValueEdit: false,
            },
          });
        },
      },
      {
        key: "false",
        label: "false",
        icon: <SettingOutlined style={{ paddingTop: 2 }} />,
        extra: "⌘F",
        onClick: (e) => {
          props.confirm({
            update: {
              defaultValue: e.key || "",
              isDefaultValueEdit: false,
            },
          });
        },
      },
    ];
  }, [props.datatype]);

  if (["string", "number"].includes(datatype)) {
    return (
      <Input
        id={selfRef}
        type={datatype === "string" ? "text" : "number"}
        style={{
          ...originalStyle,
          width: `${props.defaultValue.length + 4}ch`,
        }}
        defaultValue={props.defaultValue}
        onPressEnter={(e: React.KeyboardEvent<HTMLInputElement>) => {
          props.confirm({
            update: {
              defaultValue: e.currentTarget.value || "",
              isDefaultValueEdit: false,
            },
          });
        }}
        onKeyUp={(e) => {
          if (e.code === "Escape") {
            e.preventDefault();
            props.cancel({
              update: {
                defaultValue: props.defaultValue || "",
                isDefaultValueEdit: false,
              },
            });
          }
        }}
        onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
          props.confirm({
            update: {
              defaultValue: e.currentTarget.value || "",
              isDefaultValueEdit: false,
            },
          });
        }}
      />
    );
  }

  if (["boolean"].includes(datatype)) {
    return (
      <Dropdown trigger={["contextMenu"]} menu={{ items: menus }}>
        <Tag color="cyan">{props.defaultValue}</Tag>
      </Dropdown>
    );
  }

  return <></>;
};

export default DefaultValueEdit;
