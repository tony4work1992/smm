import { ICommonEvents, ICommonProps, IEventPayload } from './IEventPayload';


export interface DataTypeOnChangeParams {
    update: IEventPayload,
    datatype: string;
    fPath: string;
    hide?: boolean;
}

export interface FieldOnChangeParams extends IEventPayload {
    datatype: string;
    fPath: string;
    hide?: boolean;
}

export interface TreeDataBuilderEvents {
    onFieldChange: (params: DataTypeOnChangeParams) => void;
}

export interface IDataTypeProps extends ICommonEvents, ICommonProps {
    datatype: string;
    fPath: string;
    hide?: boolean;
    onChange: (params: IEventPayload) => void;
}