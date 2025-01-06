import React from "react";
/**
 * Let the organism know that an input is editing
 * @returns
 */
export const useEditState = () => {
  const editStateRef = React.useRef<{ editing: boolean }>({ editing: false });
  const enableEditMode = () => {
    editStateRef.current = { editing: true };
  };
  const disableEditMode = () => {
    editStateRef.current = { editing: false };
  };

  return {
    enableEditMode,
    disableEditMode,
    isEditing: () => editStateRef.current.editing,
  };
};
