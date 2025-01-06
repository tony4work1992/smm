import { Input } from "antd";
import React from "react";
import { FieldNameEditProps } from "../../../../@types/components/atoms/FieldNameProps";
import useAutoFocus from "../../../../hooks/useAutoFocus";

const tagInputStyle: React.CSSProperties = {
  paddingLeft: 0,
  paddingTop: 2,
  minWidth: 20,
  width: "10ch",
  height: 25,
  marginInlineStart: 5,
  verticalAlign: "middle",
  border: "1px dashed green",
  borderRadius: 0,
};

const FieldNameEdit: React.FC<FieldNameEditProps> = (props) => {
  const selfRef = useAutoFocus();

  return (
    <Input
      id={selfRef}
      style={{ ...tagInputStyle, width: `${props.fieldname.length + 4}ch` }}
      defaultValue={props.fieldname}
      onPressEnter={(e: React.KeyboardEvent<HTMLInputElement>) => {
        props.confirm({
          update: {
            fieldname: e.currentTarget.value || "",
            isFieldEdit: false,
          },
        });
      }}
      onKeyUp={(e) => {
        if (e.code === "Escape") {
          e.preventDefault();
          props.cancel({
            update: {
              defaultValue: props.fieldname || "",
              isDefaultValueEdit: false,
            },
          });
        }
      }}
      onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
        props.confirm({
          update: {
            fieldname: e.currentTarget.value || "",
            isFieldEdit: false,
          },
        });
      }}
    />
  );
};

export default FieldNameEdit;
