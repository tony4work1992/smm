import _ from 'lodash';
import { IInputModelTree } from '../../@types/IInputModelTree';
import { HookReturnedParams } from '../types';

export const useHeadFieldFocus = (params: HookReturnedParams) => {

    const findHeadField = (item: IInputModelTree) => {
        const { focusField, modelProcessor, inputDataManager } = params;
        const focusingPath = focusField.get();
        const path = modelProcessor.getInputPath(`${focusingPath}`);
        inputDataManager.modify(`${path}.metadata.isFieldFocused`, false);
        const nextDataIndex = Object.entries(inputDataManager.get()).find(([key, value]) => {
            if (item.dataIndex === null || item.dataIndex === undefined) {
                return false;
            }
            return (key.includes('metadata.dataIndex') && value === 0)
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
        if (item.dataIndex === 0) {
            return false;
        }
        return true;
    }

    return {
        validate,
        findHeadField
    }

}