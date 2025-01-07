import { ILevelObject } from "../../../hooks/types";
import {
  FieldNameEditProps,
  FieldNameViewProps,
} from "../atoms/FieldNameProps";
import { IDataTypeProps } from "../atoms/IDataTypeProps";
import { IDeleteButtonProps } from "../atoms/IDeleteButtonProps";

export type FieldNodeProps = {
  isFieldEdit?: boolean;
  isDefaultValueEdit?: boolean;
  selected: ILevelObject;
  isSelecting: boolean;
} & IDataTypeProps &
  FieldNameEditProps &
  FieldNameViewProps &
  ILevelObject &
  IDeleteButtonProps;
