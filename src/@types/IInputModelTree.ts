import { ILevelObject } from "../hooks/types";

export interface IInputModelTree extends ILevelObject {
  index: number;
  isFieldEdit: boolean;
  isDefaultValueEdit: boolean;
  disabled?: boolean;
}
