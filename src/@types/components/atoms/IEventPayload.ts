export interface IEventObject {
    key: string,
    value: string | boolean | number
}

export interface IEventPayload {
    update: IEventObject | IEventObject[],
}

export interface ICommonEvents {
    onClick: (params: IEventPayload) => void;
    // onArrowUp: (params: IEventPayload) => void; // Go to the previous leaf
    // onArrowDown: (params: IEventPayload) => void; // Go to the next leaf
    // onArrowLeft: (params: IEventPayload) => void; // Go to the root leaf
    // onArrowRight: (params: IEventPayload) => void; // Go to the last leaf
}

export interface ICommonProps {
    isFieldFocused?: boolean;
    hotkeys: { key: string, event: string }[]
}

