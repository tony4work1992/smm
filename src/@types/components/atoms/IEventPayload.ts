export interface IEventObject {
    key: string,
    value: string | boolean | number
}

export interface IEventPayload {
    update: IEventObject | IEventObject[],
}

export interface ICommonEvents {
    onClick: (params: IEventPayload) => void;
    // onKeyDown: (params: IEventPayload) => void;
}

export interface ICommonProps {
    isFieldFocused?: boolean;
    hotkeys: { key: string, event: string }[]
}

