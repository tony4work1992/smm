import { PropsWithChildren } from 'react';
import { IEventPayload } from './IEventPayload';


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

export interface IDataTypeProps extends PropsWithChildren {
    datatype: string;
    fPath: string;
    hide?: boolean;
    onChange: (params: DataTypeOnChangeParams['update']) => void
}