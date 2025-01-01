import React from 'react'
import { IInputModelTree } from '../@types/IInputModelTree'

export const useEditState = () => {
    const [editState, setEditState] = React.useState<{ editing: Boolean, info: IInputModelTree | null }>()
    const enableEditMode = (info: IInputModelTree) => {
        setEditState({ editing: true, info })
    }
    const disableEditMode = () => {
        setEditState({ editing: false, info: null })
    }

    return {
        enableEditMode,
        disableEditMode,
        isEditing: () => editState?.editing
    }

}