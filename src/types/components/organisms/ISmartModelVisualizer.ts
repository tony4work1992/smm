import { PanelTypes } from '../../../@constants/panels/PanelTypes';
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
    panelType: PanelTypes;
    setActivePanel: React.Dispatch<React.SetStateAction<PanelTypes>>;
    onModelChange?: (params: {
        item: T;
        data: T[];
    }) => void;
}
