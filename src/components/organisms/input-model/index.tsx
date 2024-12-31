import { Tree } from 'antd';
import { flatten, unflatten } from 'flat';
import _ from 'lodash';
import React from 'react';
import { FieldOnChangeParams } from '../../../@types/components/atoms/IDataTypeProps';
import { IEventObject, IEventPayload } from '../../../@types/components/atoms/IEventPayload';
import { IInputModelTree } from '../../../@types/IInputModelTree';
import useInputConverter from './hooks/useInputConverter';
import useInputDataManager from './hooks/useInputDataManager';
import useModelProcessor from './hooks/useModelProcessor';
import useTreeDataBuilder from './hooks/useTreeDataBuilder';
import { IData } from './types/StateTypes';
import useFocusPath from './hooks/useFocusPath';


interface InputModelOrganismProps {
    data: IData
}

const InputModelOrganism: React.FC<InputModelOrganismProps> = (props) => {
    const [state, setState] = React.useState<IInputModelTree[]>([]);
    const inputDataManager = useInputDataManager();
    const modelProcessor = useModelProcessor();
    const inputConverter = useInputConverter();
    // Focused Field
    const focusField = useFocusPath();

    const onFieldChange = (params: FieldOnChangeParams) => {
        // console.log(params)
        const path = modelProcessor.getInputPath(`${params.fPath}`);
        
        if (_.isArray(params.update)) {
            for (const item of params.update) {
                inputDataManager.modify(`${path}.metadata.${item.key}`, item.value)
            }
            const flattenObj = inputDataManager.get()
            // const flattenObj = inputDataManager.modify(`${path}.metadata.${item.key}`, item.value)
            const treeData = inputConverter.convert(unflatten(flattenObj));
            setState(treeData);
        }

        if (_.isObject(params.update)) {
            const update = params.update as IEventObject;
            const flattenObj = inputDataManager.modify(`${path}.metadata.${update.key}`, update.value)
            const treeData = inputConverter.convert(unflatten(flattenObj));
            setState(treeData);
        }
    }

    const onFieldFocus = (params: FieldOnChangeParams) => {
        let focusingPath = focusField.get();
        if (focusingPath) {
            const path = modelProcessor.getInputPath(`${focusingPath}`);
            // Reset the current focusing path.
            inputDataManager.modify(`${path}.metadata.isFieldFocused`, false)
        }
        focusField.set(params.fPath);
    }

    const initEvents = (item: IInputModelTree) => {
        return {
            onChange: (params: IEventPayload) => {
                onFieldChange({ ...params, ...item })
            },
            onBlur: (params: IEventPayload) => {
                onFieldChange({ ...params, ...item })
            },
            onDoubleClick: (params: IEventPayload) => {
                onFieldChange({ ...params, ...item })
            },
            onPressEnter: (params: IEventPayload) => {
                onFieldChange({ ...params, ...item })
            },
            onClick: (params: IEventPayload) => {
                // Reset
                onFieldFocus({ ...params, ...item });
                onFieldChange({ ...params, ...item })
            }
        }
    }

    const treeDataBuilder = useTreeDataBuilder(initEvents);

    React.useEffect(() => {
        if (!props.data) {
            return;
        }
        inputConverter.setKeysRef([])
        inputDataManager.set(flatten<IData, Record<string, any>>(props.data))
        const treeData = inputConverter.convert(props.data);
        setState(treeData);

    }, [])



    return (
        <div>
            <Tree
                showLine={true}
                // onSelect={onSelect}
                expandedKeys={inputConverter.getKeys()}
                defaultExpandedKeys={inputConverter.getKeys()}
                treeData={treeDataBuilder.build(state)}
            >

            </Tree>

        </div>
    );
};

export default InputModelOrganism;