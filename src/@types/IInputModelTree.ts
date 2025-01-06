import { ILevelObject } from "../hooks/types";

export interface IInputModelTree extends ILevelObject {
  isFieldEdit: boolean;
  isDefaultValueEdit: boolean;
  disabled?: boolean;
}
