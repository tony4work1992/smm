import { ICommonEvents, ICommonProps, IEventPayload } from './IEventPayload';


export interface FieldNameViewProps extends ICommonEvents, ICommonProps  {
    fieldname: string;
    fPath: string;
    hide?: boolean;
    onDoubleClick: (params: IEventPayload) => void;
}


export interface FieldNameEditProps {
    fieldname: string;
    fPath: string;
    hide?: boolean;
    onPressEnter: (params: IEventPayload) => void;
    onBlur: (params: IEventPayload) => void;
}
