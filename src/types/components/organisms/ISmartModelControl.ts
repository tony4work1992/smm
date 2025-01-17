import { PanelTypes } from "../../../@constants/panels/PanelTypes";
import { ISettingProps } from "../molecules/ISettingProps";

export interface ISmartModelControlProps {
  activePanel: PanelTypes;
  setting: Pick<
    ISettingProps,
    "resizeable" | "rowHeight" | "panelWidth" | "isActive"
  >;
  onSettingChange?: (params: {
    rowHeight: number;
    panelWidth: number;
    resizeable: boolean;
  }) => void;
}
