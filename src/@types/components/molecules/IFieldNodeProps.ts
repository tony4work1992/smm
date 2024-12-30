import { IMetaData } from '../../IMetaData';
import { FieldNameEditProps, FieldNameViewProps } from '../atoms/FieldNameProps';
import { IDataTypeProps } from '../atoms/IDataTypeProps';

export type FieldNodeProps = {
    isFieldEdit?: boolean;
} & IMetaData & IDataTypeProps & FieldNameEditProps & FieldNameViewProps