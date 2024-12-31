import { IInputModelTree } from '../../@types/IInputModelTree';
import { HookReturnedParams } from '../types';

export const useNextFieldFocus = (params: HookReturnedParams) => {

    const findNextField = (item: IInputModelTree) => {
        const { focusField, modelProcessor, inputDataManager } = params;
        const focusingPath = focusField.get();
        const path = modelProcessor.getInputPath(`${focusingPath}`);
        inputDataManager.modify(`${path}.metadata.isFieldFocused`, false);
        const nextDataIndex = Object.entries(inputDataManager.get()).find(([key, value]) => {
            if (item.dataIndex === null || item.dataIndex === undefined) {
                return false;
            }
            return (key.includes('metadata.dataIndex') && value === item.dataIndex + 1)
        });
        return nextDataIndex;

    }

    const validate = (item: IInputModelTree) => {
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