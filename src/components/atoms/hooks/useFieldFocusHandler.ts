const useFieldFocusHandler = () => {
    const getFocusedStyles = (isFocused: boolean, style: React.CSSProperties): React.CSSProperties => {
        if (isFocused) {
            return {
                ...style,
                // background: "whitesmoke",
                // color: "gray",
                transition: 'background 0.25s ease-in, color 0.25s ease-in'
            }
        }
        return style;
    }
    return {
        getFocusedStyles
    }
}

export default useFieldFocusHandler;