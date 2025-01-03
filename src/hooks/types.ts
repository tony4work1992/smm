import { IMetaData } from '../@types/IMetaData';
import useFocusHelper from './useFocusHelper';
import useInputDataManager from './useInputDataManager';
import useModelProcessor from './useModelProcessor';

export interface HookReturnedParams {
    focusField: ReturnType<typeof useFocusHelper>;
    modelProcessor: ReturnType<typeof useModelProcessor>;
    inputDataManager: ReturnType<typeof useInputDataManager>;
}

export interface ILevelObject extends IMetaData {
    prefix: string,
    level: number,
    fPath: string,
    index: number
}
