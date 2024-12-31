import { unflatten } from 'flat';
import _ from 'lodash';
import { FieldOnChangeParams } from '../@types/components/atoms/IDataTypeProps';
import { IEventObject } from '../@types/components/atoms/IEventPayload';
import { HookReturnedParams } from './types';

export const useFieldChange = (hookParams: HookReturnedParams) => {
    const process = (params: FieldOnChangeParams) => {
        const { modelProcessor, inputConverter, inputDataManager, } = hookParams;
        // console.log(params)
        const path = modelProcessor.getInputPath(`${params.fPath}`);

        if (_.isArray(params.update)) {
            for (const item of params.update) {
                inputDataManager.modify(`${path}.metadata.${item.key}`, item.value)
            }
            const flattenObj = inputDataManager.get()
            const treeData = inputConverter.convert(unflatten(flattenObj));
            return treeData;
        }

        if (_.isObject(params.update)) {
            const update = params.update as IEventObject;
            const flattenObj = inputDataManager.modify(`${path}.metadata.${update.key}`, update.value)
            const treeData = inputConverter.convert(unflatten(flattenObj));
            return treeData
        }
        return null;
    }
    return {
        process
    };
}