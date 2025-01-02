import { unflatten } from 'flat';
import _ from 'lodash';
import { IInputModelTree } from '../../@types/IInputModelTree';
import { HookReturnedParams } from '../types';

export const useTrailFieldFocus = (params: HookReturnedParams) => {

    const findTrailField = (item: Pick<IInputModelTree, 'dataIndex' | 'fPath'>) => {
        const { inputDataManager, jsonIndexer } = params;
        const [key] = Object.entries(inputDataManager.get()).find(([key, value]) => {
            if (item.dataIndex === null || item.dataIndex === undefined) {
                return false;
            }
            return (key.includes('metadata.dataIndex') && value === jsonIndexer.getMaxIndex())
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
        if (_.isNil(item.dataIndex)) {
            throw new Error(
                `The current data Index is Nil:
                    item: ${JSON.stringify(item)}
                    params: ${JSON.stringify(params)}
                `)
        }
        const { jsonIndexer } = params;

        if (item.dataIndex === jsonIndexer.getMaxIndex()) {
            return false;
        }
        return true;
    }

    return {
        validate,
        findTrailField
    }

}