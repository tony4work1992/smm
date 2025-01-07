import { ILevelObject } from "../../../hooks/types";
import {
  FieldNameEditProps,
  FieldNameViewProps,
} from "../atoms/FieldNameProps";
import { IDataTypeProps } from "../atoms/IDataTypeProps";
import { DefaultValueViewProps } from '../atoms/IDefaultValueProps';
import { IDeleteButtonProps } from "../atoms/IDeleteButtonProps";

export type FieldNodeProps = {
  isFieldEdit?: boolean;
  isDefaultValueEdit?: boolean;
  selected: ILevelObject;
  isSelecting: boolean;
  cancel: () => void;
} & IDataTypeProps &
  FieldNameEditProps &
  FieldNameViewProps &
  DefaultValueViewProps &
  ILevelObject &
  IDeleteButtonProps;
