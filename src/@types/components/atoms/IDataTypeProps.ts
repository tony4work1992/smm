import { ILevelObject } from "../../../hooks/types";
import { IEventPayload } from "./IEventPayload";

export interface DataTypeOnChangeParams {
  update: IEventPayload;
  datatype: string;
  fPath: string;
  hide?: boolean;
}

export interface FieldOnChangeParams extends IEventPayload {
  datatype: string;
  fPath: string;
  hide?: boolean;
}

export interface TreeDataBuilderEvents {
  onFieldChange: (params: DataTypeOnChangeParams) => void;
}

export interface IDataTypeProps extends ILevelObject {
  hide?: boolean;
  open?: boolean;
  selected?: ILevelObject;
  onChange: (params: IEventPayload) => void;
}
