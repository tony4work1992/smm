import { IData, IPathMapperData } from '../lib/main';

export interface SmartModelMapperProps {
    from: IData;
    to: IData;
    mapping: IPathMapperData[]
}