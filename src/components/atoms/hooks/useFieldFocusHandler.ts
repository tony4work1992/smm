const useFieldFocusHandler = () => {
    const getFocusedStyles = (isFocused: boolean, style: React.CSSProperties): React.CSSProperties => {
        if (isFocused) {
            return {
                ...style,
                background: "#339933",
                color: "#ffffff"
            }
        }
        return style;
    }
    return {
        getFocusedStyles
    }
}

export default useFieldFocusHandler;