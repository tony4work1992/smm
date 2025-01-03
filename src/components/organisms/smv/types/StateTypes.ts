import { IMetaData } from '../../../../@types/IMetaData'

export interface IValueData {
    metadata: IMetaData,
    fields: IData
}
export interface IData {
    [key: string]: IValueData
}