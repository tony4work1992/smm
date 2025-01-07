import { PanelTypes } from '../../../@constants/panels/PanelTypes';
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
    panelType: PanelTypes;
    setActivePanel: React.Dispatch<React.SetStateAction<PanelTypes>>;
    toModel: IInputModelTree[];
    data: IPathMapperData[];
    onPathUpdate: (data: IPathMapperData[]) => void;
}

