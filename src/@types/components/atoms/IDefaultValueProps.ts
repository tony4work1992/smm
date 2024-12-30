import { IEventPayload } from './IEventPayload';


export interface DefaultValueViewProps {
    defaultValue: string;
    fPath: string;
    hide?: boolean;
    onDoubleClick: (params: IEventPayload) => void;
}


export interface DefaultValueEditProps {
    defaultValue: string;
    fPath: string;
    hide?: boolean;
    onPressEnter: (params: IEventPayload) => void;
    onBlur: (params: IEventPayload) => void;
}
