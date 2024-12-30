import React from 'react';

const useInputDataManager = () => {
    const inputDataRef = React.useRef<Record<string, any>>({});
    const focusPathRef = React.useRef<Record<'focusingPath', string | null>>({
        focusingPath: null
    });

    const set = (data: Record<string, any>) => inputDataRef.current = data;

    const modify = (path: string, value: any) => {
        inputDataRef.current[path] = value;
        return inputDataRef.current;
    }

    const get = () => {
        return inputDataRef.current;
    }

    const updateFocusPath = (data: Record<'focusingPath', string | null>) => focusPathRef.current.focusingPath = data.focusingPath;

    return {
        set,
        get,
        modify,
        updateFocusPath
    }
}

export default useInputDataManager;