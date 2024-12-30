import React, { Key } from 'react';
import { IInputModelTree } from '../../../../@types/IInputModelTree';
import { IData } from '../types/StateTypes';

const useInputConverter = () => {
    const keysRef = React.useRef<Key[]>([])

    /**
     * Convert into format of the tree
     * @param data 
     * @param parentPath 
     * @returns 
     */
    const convert = (data: IData, parentPath: string = ""): IInputModelTree[] => {
        return Object.entries(data).map(([key, value]) => {
            const currentPath = parentPath ? `${parentPath}.${key}` : `${key}`;
            keysRef.current.push(currentPath);
            return {
                fPath: currentPath,
                title: value.metadata.fieldname,
                selectable: false,
                fieldname: value.metadata.fieldname,
                datatype: value.metadata.datatype,
                defaultValue: value.metadata.defaultValue,
                children: convert(value.fields, currentPath),
                isFieldEdit: (value as any).metadata.isFieldEdit
            };
        });

    }

    const setKeysRef = (arr: Key[]) => {
        keysRef.current = arr;
    }

    const getKeys = () => {
        return keysRef.current;
    }
    return {
        convert,
        getKeys,
        setKeysRef
    }
}

export default useInputConverter;