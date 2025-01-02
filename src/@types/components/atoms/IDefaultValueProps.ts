import { ICommonProps, IEventPayload } from './IEventPayload';


export interface DefaultValueViewProps extends ICommonProps {
    defaultValue: string;
    fPath: string;
    hide?: boolean;
    onDoubleClick: (params: IEventPayload) => void;
}


export interface DefaultValueEditProps {
    defaultValue: string;
    datatype: string;
    fPath: string;
    hide?: boolean;
    confirm: (params: IEventPayload) => void;
    cancel: (params: IEventPayload) => void;
}
