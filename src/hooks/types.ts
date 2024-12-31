import useFocusPath from './useFocusPath';
import useInputConverter from './useInputConverter';
import useInputDataManager from './useInputDataManager';
import useJsonIndexer from './useJsonIndexer';
import useModelProcessor from './useModelProcessor';

export interface HookReturnedParams {
    focusField: ReturnType<typeof useFocusPath>;
    modelProcessor: ReturnType<typeof useModelProcessor>;
    inputDataManager: ReturnType<typeof useInputDataManager>;
    jsonIndexer: ReturnType<typeof useJsonIndexer>;
    inputConverter: ReturnType<typeof useInputConverter>

}