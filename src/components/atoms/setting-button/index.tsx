import SettingOutlined from "@ant-design/icons/lib/icons/SettingOutlined";
import { ISettingButtonProps } from "../../../types/components/atoms/ISettingButtonProps";
import { Button } from "antd";

const SettingButtonAtom: React.FC<ISettingButtonProps> = (props) => {
  return (
    <Button color="primary" variant="link">
      <SettingOutlined className={props.isActive ? "cog-active" : ""} />
    </Button>
  );
};

export default SettingButtonAtom;
