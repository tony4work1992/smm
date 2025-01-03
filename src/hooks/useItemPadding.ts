import { IInputModelTree } from '../@types/IInputModelTree';

export const useItemPadding = () => {
    const add = (state: IInputModelTree[]) => {
        const paddingNumber = 38 - state.length;
        const arr = new Array(paddingNumber).fill({} as IInputModelTree);
        return state.concat(arr);
    }
    return {
        add
    }
}