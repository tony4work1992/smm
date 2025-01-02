import { IMetaData } from '../@types/IMetaData';
import useFocusHelper from './useFocusHelper';
import useInputDataManager from './useInputDataManager';
import useJsonIndexer from './useJsonIndexer';
import useModelProcessor from './useModelProcessor';

export interface HookReturnedParams {
    focusField: ReturnType<typeof useFocusHelper>;
    modelProcessor: ReturnType<typeof useModelProcessor>;
    inputDataManager: ReturnType<typeof useInputDataManager>;
    jsonIndexer: ReturnType<typeof useJsonIndexer>;
}

export interface ILevelObject extends IMetaData {
    prefix: string,
    level: number,
    fPath: string,
}
