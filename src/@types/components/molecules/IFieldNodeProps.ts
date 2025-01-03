import { ILevelObject } from '../../../hooks/types';
import { FieldNameEditProps, FieldNameViewProps } from '../atoms/FieldNameProps';
import { IDataTypeProps } from '../atoms/IDataTypeProps';

export type FieldNodeProps = {
    isFieldEdit?: boolean;
    isDefaultValueEdit?: boolean;
    selected: ILevelObject;
} & IDataTypeProps & FieldNameEditProps & FieldNameViewProps & ILevelObject