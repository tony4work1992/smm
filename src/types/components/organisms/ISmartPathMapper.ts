import { PanelTypes } from "../../../@constants/panels/PanelTypes";
import { IInputModelTree } from "../../../types/IInputModelTree";
import { PathSelectStatus } from "../atoms/IPathSelectProps";

export interface IPathMapperData {
  from: {
    fPath: string;
    status: PathSelectStatus;
  };
  to: {
    fPath: string;
    status: PathSelectStatus;
  };
}

export interface SmartPathMapperProps {
  fromModel: IInputModelTree[];
  panelType: PanelTypes;
  setActivePanel: React.Dispatch<React.SetStateAction<PanelTypes>>;
  toModel: IInputModelTree[];
  data: IPathMapperData[];
  height?: number;
  onPathUpdate: (data: IPathMapperData[]) => void;
}
