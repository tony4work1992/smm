import { IEventPayload } from '../../../../@types/components/atoms/IEventPayload';
import { IInputModelTree } from '../../../../@types/IInputModelTree';
import FieldNodeMolecules from '../../../molecules/field-node';

interface IInitEventReturn {
    onChange: (params: IEventPayload) => void;
    onBlur: (params: IEventPayload) => void;
    onDoubleClick: (params: IEventPayload) => void;
    onPressEnter: (params: IEventPayload) => void;
    onClick: (params: IEventPayload) => void;
}

const useTreeDataBuilder = (initEventsFunc: (item: IInputModelTree) => IInitEventReturn) => {
    const build = (treeData: IInputModelTree[]): IInputModelTree[] => {
        return treeData.map((item) => {
            const events = initEventsFunc(item)
            return {
                ...item,
                key: `${item.fPath}`, // Key of the node
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
                        hotkeys={[{event: 'onDoubleClick', key: 'm'}]}
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