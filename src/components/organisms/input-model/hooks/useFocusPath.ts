import React from 'react';

const useFocusPath = () => {
    const focusPathRef = React.useRef<string | null>(null);

    React.useEffect(() => {
        if (!focusPathRef.current) {
            return;
        }
        setTimeout(() => {
            document.getElementById(`${focusPathRef.current}_input` || '')?.focus()
        }, 200)
    }, [focusPathRef.current])
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