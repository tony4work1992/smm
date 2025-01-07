import { IMetaData } from "../../IMetaData";

export interface IValueData {
    metadata: IMetaData;
    fields: IData;
}
export interface IData {
    [key: string]: IValueData;
}

export interface SmartModelVisualizerProps<T> {
    data: IData;
    onModelChange?: (params: {
        item: T;
        data: T[];
    }) => void;
}
