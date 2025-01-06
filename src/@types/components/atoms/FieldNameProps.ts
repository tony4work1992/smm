import { ILevelObject } from "../../../hooks/types";
import { IEventPayload } from "./IEventPayload";

export interface FieldNameViewProps extends ILevelObject {
  hide?: boolean;
  selected?: ILevelObject;
  onDoubleClick: (params: IEventPayload) => void;
}

export interface FieldNameEditProps {
  fieldname: string;
  fPath: string;
  hide?: boolean;
  confirm: (params: IEventPayload) => void;
  cancel: (params: IEventPayload) => void;
}
