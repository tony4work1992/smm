import ILockSwitchProps from "../atoms/ILockSwitchProps";

export type ISettingContentProps = {
  rowHeight: number;
  panelWidth: number;
  onRowHeightChange: (value: number | null) => void;
  onPanelWidthchange: (value: number | null) => void;
} & ILockSwitchProps;
