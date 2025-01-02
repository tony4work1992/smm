export interface IEventObject {
    key: string,
    value: string | boolean | number
}

export interface IEventPayload {
    update: IEventObject | IEventObject[],
}


export interface ICommonProps {
    hotkeys: { key: string, event: string }[]
}

