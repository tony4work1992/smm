import { IEventPayload } from '../@types/components/atoms/IEventPayload';
import { IInputModelTree } from '../@types/IInputModelTree';
import FieldNodeMolecules from '../components/molecules/field-node';

export interface IInitEventReturn {
    onChange: (params: IEventPayload) => void;
    onDoubleClick: (params: IEventPayload) => void;
    confirm: (params: IEventPayload) => void;
    cancel: (params: IEventPayload) => void;
}

const useTreeDataBuilder = (initEventsFunc: (item: IInputModelTree) => IInitEventReturn, hotkeys: { key: string, event: string }[]) => {
    const build = (treeData: IInputModelTree[]): IInputModelTree[] => {
        return treeData.map((item) => {
            const events = initEventsFunc(item)
            return {
                ...item,
                key: `${item.fPath}`, // Key of the node
                selectable: true,
                dataIndex: item.dataIndex,
                title: (
                    <FieldNodeMolecules
                        {...events}
                        isFieldEdit={item.isFieldEdit}
                        isDefaultValueEdit={item.isDefaultValueEdit}
                        fPath={`${item.fPath}`}
                        fieldname={item.fieldname}
                        datatype={item.datatype}
                        defaultValue={item.defaultValue}
                        key={item.fPath}
                        hotkeys={hotkeys}
                    />
                ),
                children: build(item.children || []), // Recursive call for children
            }
        });
    }

    return {
        build
    }
}

export default useTreeDataBuilder;