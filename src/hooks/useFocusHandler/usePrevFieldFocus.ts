import { unflatten } from 'flat';
import _ from 'lodash';
import { IInputModelTree } from '../../@types/IInputModelTree';
import { HookReturnedParams } from '../types';

export const usePrevFieldFocus = (params: HookReturnedParams) => {

    const findPrevField = (item: Pick<IInputModelTree, 'dataIndex' | 'fPath'>) => {
        const { inputDataManager } = params;
        const [key] = Object.entries(inputDataManager.get()).find(([key, value]) => {
            return (key.includes('metadata.dataIndex') && item.dataIndex && value === item.dataIndex - 1)
        }) || [''];

        const nextMetadataPath = key.replace(".metadata.dataIndex", "");
        const unflattenData = unflatten(inputDataManager.get());


        const nextFieldObj = _.get(unflattenData, nextMetadataPath)

        return {
            dataIndex: nextFieldObj.metadata.dataIndex,
            datatype: nextFieldObj.metadata.datatype,
            defaultValue: nextFieldObj.metadata.defaultValue,
            fPath: nextMetadataPath.replace(/.fields/g, ""),
            fieldname: nextFieldObj.metadata.fieldname,
        }

    }

    const validate = (item: Pick<IInputModelTree, 'dataIndex'>) => {

        if (!item.dataIndex || item.dataIndex === 0) {
            throw new Error(
                `The current data Index is 0 or null
                    item: ${JSON.stringify(item)}
                    params: ${JSON.stringify(params)}
                `)
        }
        return true;
    }

    return {
        validate,
        findPrevField
    }

}