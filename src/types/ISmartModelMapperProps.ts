import { IData, IPathMapperData } from '../lib/main';

export interface SmartModelMapperProps {
    from: IData;
    to: IData;
    noWrapperBoder?: boolean;
    mapping: IPathMapperData[]
}