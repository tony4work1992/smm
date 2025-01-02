import { unflatten } from 'flat';
import _ from 'lodash';
import { IInputModelTree } from '../../@types/IInputModelTree';
import { HookReturnedParams } from '../types';

export const useNextFieldFocus = (params: HookReturnedParams) => {

    const findNextField = (item: Pick<IInputModelTree, 'dataIndex' | 'fPath'>) => {
        const { inputDataManager } = params;
        const [key] = Object.entries(inputDataManager.get()).find(([key, value]) => {
            if (item.dataIndex === null || item.dataIndex === undefined) {
                return false;
            }
            return (key.includes('metadata.dataIndex') && value === item.dataIndex + 1)
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
        if (item.dataIndex && item.dataIndex >= params.jsonIndexer.getMaxIndex()) {
            throw new Error(
                `The current data Index is greater than the max data index:
                    item: ${JSON.stringify(item)}
                    params: ${JSON.stringify(params)}
                `)
        }
        return true;
    }

    return {
        validate,
        findNextField
    }

}