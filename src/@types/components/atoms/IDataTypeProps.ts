import { ICommonProps, IEventPayload } from './IEventPayload';


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

export interface IDataTypeProps extends ICommonProps {
    datatype: string;
    fPath: string;
    hide?: boolean;
    open?: boolean;
    onChange: (params: IEventPayload) => void;
}