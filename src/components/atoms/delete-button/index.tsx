import { DeleteFilled } from "@ant-design/icons";
import { Button, Popover } from "antd";
import React from "react";
import { IDeleteButtonProps } from "../../../types/components/atoms/IDeleteButtonProps";

const DeleteButton: React.FC<IDeleteButtonProps> = (props) => {
  return (
    <Popover
      content={
        <a style={{ marginRight: 20 }} onClick={(e) => props.delete(e)}>
          Delete
        </a>
      }
      title="Are you sure?"
      trigger="click"
    >
      <Button
        {...props}
        danger
        type="text"
        style={{
          // background: 'red',
          // border: '1px dashed red',
          background: "red",
          border: "2px solid red",
          color: "white",
          height: 26,
          borderRadius: 0,
          position: "absolute",
          right: 0,
        }}
      >
        <DeleteFilled />
      </Button>
    </Popover>
  );
};
export default DeleteButton;
