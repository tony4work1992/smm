import { IInputModelTree } from "../../../types/IInputModelTree";

export interface IPathMapperData {
    from: {
        fPath: string;
    };
    to: {
        fPath: string;
    };
}

export interface SmartPathMapperProps {
    fromModel: IInputModelTree[];
    toModel: IInputModelTree[];
    data: IPathMapperData[];
    onPathUpdate: (data: IPathMapperData[]) => void;
}

