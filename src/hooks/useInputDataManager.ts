import React from 'react';

const useInputDataManager = () => {
    const inputDataRef = React.useRef<Record<string, any>>({});

    const set = (data: Record<string, any>) => inputDataRef.current = data;

    const modify = (path: string, value: any) => {
        inputDataRef.current[path] = value;
        return inputDataRef.current;
    }

    const get = () => {
        return inputDataRef.current;
    }


    return {
        set,
        get,
        modify
    }
}

export default useInputDataManager;