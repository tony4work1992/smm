import { ILevelObject } from "../../../hooks/types";
import { IEventPayload } from "./IEventPayload";

export interface DefaultValueViewProps extends ILevelObject {
  defaultValue: string;
  fPath: string;
  hide?: boolean;
  selected?: ILevelObject;
  isSelecting?: boolean;
  onDefaultValueDoubleClick: () => void;
}

export interface DefaultValueEditProps {
  defaultValue: string;
  datatype: string;
  fPath: string;
  hide?: boolean;
  confirm: (params: IEventPayload) => void;
  cancel: () => void;
}
