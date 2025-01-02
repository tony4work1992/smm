import * as _ from 'lodash';
import React from 'react';
import { IInputModelTree } from '../@types/IInputModelTree';
import useModelProcessor from './useModelProcessor';

export const useLevelManager = () => {
    const levelStack = React.useRef<IInputModelTree[]>([]);
    const modelProcessor = useModelProcessor();

    const build = (items: Record<string, any>) => {
        const keys = Object.keys(items).map(key => {
            const jsonPath = key.replace(/.fields/g, "");
            const metaDataIndex = jsonPath.indexOf('.metadata');
            if (metaDataIndex === -1) {
                return jsonPath;
            }
            const retStr = jsonPath.slice(0, metaDataIndex)
            return retStr;
        })

        levelStack.current = Array.from(new Set(keys)).map((item, index) => {
            const rootPath = modelProcessor.getInputPath(item).concat('.metadata');
            const paths = {
                datatype: '.datatype',
                fieldname: '.fieldname',
                defaultValue: '.defaultValue',
                dataIndex: '.dataIndex',
                isFieldEdit: '.isFieldEdit',
                isDefaultValueEdit: '.isDefaultValueEdit',
                disabled: '.disabled',
            }
            const metadata = {
                datatype: _.get(items, rootPath.concat(paths.datatype)),
                fieldname: _.get(items, rootPath.concat(paths.fieldname)),
                defaultValue: _.get(items, rootPath.concat(paths.defaultValue)),
                dataIndex: _.get(items, rootPath.concat(paths.dataIndex)),
                isFieldEdit: _.get(items, rootPath.concat(paths.isFieldEdit)),
                isDefaultValueEdit: _.get(items, rootPath.concat(paths.isDefaultValueEdit)),
                disabled: _.get(items, rootPath.concat(paths.disabled))
            };
            return {
                index,
                ...metadata,
                fPath: item,
                level: item.split('.').length - 1,
                prefix: 'L',
            }
        })
        return levelStack.current;
    }

    const get = () => levelStack.current

    const reset = () => {
        levelStack.current.length = 0
    }

    const log = () => {
        console.log('log:', levelStack)
    }

    return {
        build,
        reset,
        log,
        get
    }
}