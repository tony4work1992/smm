import React from 'react';

const useFocusPath = () => {
    const focusPathRef = React.useRef<string | null>(null);

    const set = (path: string) => focusPathRef.current = path;

    const modify = (path: string) => {
        focusPathRef.current = path;
        return focusPathRef.current;
    }

    const get = () => {
        return focusPathRef.current;
    }

    return {
        set,
        get,
        modify
    }
}

export default useFocusPath;