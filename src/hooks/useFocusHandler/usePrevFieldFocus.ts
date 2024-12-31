import { IInputModelTree } from '../../@types/IInputModelTree';
import { HookReturnedParams } from '../types';

export const usePrevFieldFocus = (params: HookReturnedParams) => {

    const findPrevField = (item: IInputModelTree) => {
        const { focusField, modelProcessor, inputDataManager } = params;
        let focusingPath = focusField.get();
        const path = modelProcessor.getInputPath(`${focusingPath}`);
        inputDataManager.modify(`${path}.metadata.isFieldFocused`, false);
        const nextDataIndex = Object.entries(inputDataManager.get()).find(([key, value]) => {
            return (key.includes('metadata.dataIndex') && item.dataIndex && value === item.dataIndex - 1)
        });
        return nextDataIndex;

    }

    const validate = (item: IInputModelTree) => {

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