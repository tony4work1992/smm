import React from "react";
/**
 * Auto focus when component displayed
 * @returns 
 */
const useAutoFocus = () => {
    const selfRef = React.useId()
    React.useEffect(() => {
        setTimeout(() => {
            document.getElementById(selfRef)?.focus()
        }, 200)
    }, []);
    return selfRef;
}

export default useAutoFocus;