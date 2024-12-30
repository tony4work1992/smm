import { IMetaData } from '../../../../@types/IMetaData'

export interface IData {
    [key: string]: {
        metadata: IMetaData,
        fields: IData
    }
}