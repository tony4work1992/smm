export interface IEventObject {
    key: string,
    value: string | boolean | Number
}

export interface IEventPayload {
    update: IEventObject | IEventObject[]
}