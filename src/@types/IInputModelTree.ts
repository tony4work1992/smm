import { TreeDataNode } from 'antd';
import { IMetaData } from './IMetaData';

export interface IInputModelTree extends IMetaData, Omit<TreeDataNode, 'children' | 'key'> {
    children: IInputModelTree[]
    fPath: string;
    isFieldEdit: boolean;
    isDefaultValueEdit: boolean;
    // Check if the row is focus or not
};