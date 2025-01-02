import { ICommonProps, IEventPayload } from './IEventPayload';


export interface FieldNameViewProps extends ICommonProps {
    fieldname: string;
    fPath: string;
    hide?: boolean;
    onDoubleClick: (params: IEventPayload) => void;
}


export interface FieldNameEditProps {
    fieldname: string;
    fPath: string;
    hide?: boolean;
    confirm: (params: IEventPayload) => void;
    cancel: (params: IEventPayload) => void;
}
