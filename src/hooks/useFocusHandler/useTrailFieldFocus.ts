import _ from 'lodash';
import { IInputModelTree } from '../../@types/IInputModelTree';
import { HookReturnedParams } from '../types';

export const useTrailFieldFocus = (params: HookReturnedParams) => {

    const findTrailField = (item: IInputModelTree) => {
        const { focusField, modelProcessor, inputDataManager, jsonIndexer } = params;
        const focusingPath = focusField.get();
        const path = modelProcessor.getInputPath(`${focusingPath}`);
        inputDataManager.modify(`${path}.metadata.isFieldFocused`, false);
        const nextDataIndex = Object.entries(inputDataManager.get()).find(([key, value]) => {
            if (item.dataIndex === null || item.dataIndex === undefined) {
                return false;
            }
            return (key.includes('metadata.dataIndex') && value === jsonIndexer.getMaxIndex())
        });
        return nextDataIndex;

    }

    const validate = (item: IInputModelTree) => {
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