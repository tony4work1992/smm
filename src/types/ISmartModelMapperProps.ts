import { IData, IPathMapperData } from '../lib/main';

export interface SmartModelMapperProps {
    from: IData;
    to: IData;
    wrapperBorder?: boolean;
    height?: number;
    width?: number | string;
    marginLeft?: number | string;
    marginRight?: number | string;
    mapping: IPathMapperData[]
}