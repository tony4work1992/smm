import React from 'react';
import { ILevelObject } from './types';

export const useLevelManager = () => {
    const levelStack = React.useRef<ILevelObject[]>([]);

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

        levelStack.current = Array.from(new Set(keys)).map((item) => {
            return {
                fPath: item,
                level: item.split('.').length - 1,
                prefix: 'L'
            }
        })
        return levelStack;
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