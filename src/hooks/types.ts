import useFocusHelper from './useFocusHelper';
import useInputConverter from './useInputConverter';
import useInputDataManager from './useInputDataManager';
import useJsonIndexer from './useJsonIndexer';
import useModelProcessor from './useModelProcessor';

export interface HookReturnedParams {
    focusField: ReturnType<typeof useFocusHelper>;
    modelProcessor: ReturnType<typeof useModelProcessor>;
    inputDataManager: ReturnType<typeof useInputDataManager>;
    jsonIndexer: ReturnType<typeof useJsonIndexer>;
    inputConverter: ReturnType<typeof useInputConverter>
}

export interface ILevelObject { prefix: string, level: number, fPath: string }
