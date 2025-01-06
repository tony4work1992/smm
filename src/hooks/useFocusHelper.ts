import React from "react";

const useFocusHelper = (id: string) => {
  const focusPathRef = React.useRef<String>(id);

  // const set = (path: string) => focusPathRef.current = path;

  const focus = () => {
    setTimeout(() => {
      document.getElementById(`${focusPathRef.current}` || "")?.focus();
    }, 150);
  };

  const get = () => {
    return focusPathRef;
  };

  return {
    get,
    focus,
  };
};

export default useFocusHelper;
