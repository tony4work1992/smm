import _ from 'lodash';
import React from 'react';
import { IData, IValueData } from '../types/StateTypes';

const useJsonIndexer = () => {
    const indexRef = React.useRef<number>(0);
    const reset = () => {
        indexRef.current = 0;
    }
    const addIndex = (obj: IValueData) => {
        // Add dataIndex to the current node's metadata
        if (obj.metadata) {
            obj.metadata.dataIndex = indexRef.current;
        }
        console.log('>>>', obj.metadata.fieldname, indexRef.current)

        // Process fields recursively
        if (obj.fields) {
            // let index = startFrom;
            for (const key in obj.fields) {
                if (obj.fields.hasOwnProperty(key)) {
                    indexRef.current += 1
                    addIndex(obj.fields[key]);
                }
            }
        }
        return obj;
    }

    const getMaxIndex = () => {
        return indexRef.current;
    }

    const process = (json: IData) => {
        const retObj = _.cloneDeep(json);
        Object.keys(retObj).forEach((key) => {
            addIndex(retObj[key])
        })
        return retObj;
    }

    return {
        process,
        reset,
        getMaxIndex
    }

}

export default useJsonIndexer;