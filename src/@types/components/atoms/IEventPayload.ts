import { IInputModelTree } from '../../IInputModelTree';

export interface IEventObject {
    key: string,
    value: string | boolean | number
}

export interface IEventPayload {
    update: Partial<IInputModelTree>
}


