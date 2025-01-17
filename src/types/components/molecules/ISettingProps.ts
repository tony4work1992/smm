import { ISettingButtonProps } from "../atoms/ISettingButtonProps";
import { ISettingContentProps } from "./ISettingContentProps";

export type ISettingProps = {
  onOpenChange: (
    open: boolean,
    e: React.MouseEvent | React.KeyboardEvent | undefined,
  ) => void;
} & ISettingContentProps &
  ISettingButtonProps;
