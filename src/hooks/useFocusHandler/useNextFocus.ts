import { unflatten } from 'flat';
import { HookReturnedParams } from '../types';

export const useNextFocus = (hookParams: HookReturnedParams) => {
    const process = (nextDataIndex: [string, any] | undefined) => {
        if (!nextDataIndex) {
            throw new Error(`Next Data Index was not found: ${nextDataIndex}`)
        }

        const { focusField, inputConverter, inputDataManager } = hookParams;
        const [key] = nextDataIndex;
        const nextFieldFocused = key.replace("metadata.dataIndex", "metadata.isFieldFocused");
        const fPath = key.replace(".metadata.dataIndex", "").replace(/.fields/g, "");
        focusField.set(fPath);
        inputDataManager.modify(nextFieldFocused, true);
        const flattenObj = inputDataManager.get()
        const treeData = inputConverter.convert(unflatten(flattenObj));
        return treeData;
    }
    return { process }
}