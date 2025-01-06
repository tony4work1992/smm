import { IInputModelTree } from "../../../../@types/IInputModelTree";

export interface SmartPathMapperProps {
  fromModel: IInputModelTree[];
  toModel: IInputModelTree[];
  data: IPathMapperData[];
  onPathUpdate: (data: IPathMapperData[]) => void;
}

export interface IPathMapperData {
  from: {
    fPath: string;
  };
  to: {
    fPath: string;
  };
}
