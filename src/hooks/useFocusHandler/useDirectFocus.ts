import { FieldOnChangeParams } from '../../@types/components/atoms/IDataTypeProps';
import { HookReturnedParams } from '../types';

export const useDirectFocus = (hookParams: HookReturnedParams) => {
    const process = (params: FieldOnChangeParams) => {
        const { focusField, modelProcessor, inputDataManager } = hookParams;
        let focusingPath = focusField.get();
        if (focusingPath) {
            const path = modelProcessor.getInputPath(`${focusingPath}`);
            // Reset the current focusing path.
            inputDataManager.modify(`${path}.metadata.isFieldFocused`, false)
        }
        focusField.set(params.fPath);
    }

    return {
        process
    }
}