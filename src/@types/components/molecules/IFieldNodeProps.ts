import { IMetaData } from '../../IMetaData';
import { FieldNameEditProps, FieldNameViewProps } from '../atoms/FieldNameProps';
import { IDataTypeProps } from '../atoms/IDataTypeProps';

export type FieldNodeProps = {
    isFieldEdit?: boolean;
    isDefaultValueEdit?: boolean;
    // Check if the row is focus or not
    isFieldFocused?: boolean;
} & IMetaData & IDataTypeProps & FieldNameEditProps & FieldNameViewProps