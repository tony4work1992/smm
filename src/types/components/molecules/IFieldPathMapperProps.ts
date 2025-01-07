import { IDeleteButtonProps } from "../atoms/IDeleteButtonProps";
import { IPathSelectProps } from "../atoms/IPathSelectProps";

export type IFieldPathMapperProps = {
  index: number;
  fromModel: IPathSelectProps;
  toModel: IPathSelectProps;
  isSelecting: boolean;
} & IDeleteButtonProps
