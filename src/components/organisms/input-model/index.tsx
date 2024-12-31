import { Tree } from 'antd';
import { flatten, unflatten } from 'flat';
import _ from 'lodash';
import React from 'react';
import { FieldOnChangeParams } from '../../../@types/components/atoms/IDataTypeProps';
import { IEventObject, IEventPayload } from '../../../@types/components/atoms/IEventPayload';
import { IInputModelTree } from '../../../@types/IInputModelTree';
import { hotkeys } from './constants/HotKeyConfig';
import useFocusPath from './hooks/useFocusPath';
import useInputConverter from './hooks/useInputConverter';
import useInputDataManager from './hooks/useInputDataManager';
import useJsonIndexer from './hooks/useJsonIndexer';
import useModelProcessor from './hooks/useModelProcessor';
import useTreeDataBuilder, { IInitEventReturn } from './hooks/useTreeDataBuilder';
import { IData } from './types/StateTypes';


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
    const jsonIndexer = useJsonIndexer();

    const onFieldChange = (params: FieldOnChangeParams) => {
        // console.log(params)
        const path = modelProcessor.getInputPath(`${params.fPath}`);

        if (_.isArray(params.update)) {
            for (const item of params.update) {
                inputDataManager.modify(`${path}.metadata.${item.key}`, item.value)
            }
            const flattenObj = inputDataManager.get()
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



    const focusOnPrevLeaf = (item: IInputModelTree) => {

        if (!item.dataIndex) {
            return;
        }
        let focusingPath = focusField.get();
        const path = modelProcessor.getInputPath(`${focusingPath}`);
        inputDataManager.modify(`${path}.metadata.isFieldFocused`, false);
        const nextDataIndex = Object.entries(inputDataManager.get()).find(([key, value]) => {
            return (key.includes('metadata.dataIndex') && item.dataIndex && value === item.dataIndex - 1)
        });
        if (nextDataIndex) {
            const [key] = nextDataIndex;
            const nextFieldFocused = key.replace("metadata.dataIndex", "metadata.isFieldFocused");
            const fPath = key.replace(".metadata.dataIndex", "").replace(/.fields/g, "");
            focusField.set(fPath);
            inputDataManager.modify(nextFieldFocused, true);
            const flattenObj = inputDataManager.get()
            const treeData = inputConverter.convert(unflatten(flattenObj));
            setState(treeData);
        }
    }
    const focusOnNextLeaf = (item: IInputModelTree) => {

        if (item.dataIndex && item.dataIndex >= jsonIndexer.getMaxIndex()) {
            return;
        }
        let focusingPath = focusField.get();
        const path = modelProcessor.getInputPath(`${focusingPath}`);
        inputDataManager.modify(`${path}.metadata.isFieldFocused`, false);
        const nextDataIndex = Object.entries(inputDataManager.get()).find(([key, value]) => {
            if (item.dataIndex === null || item.dataIndex === undefined) {
                return false;
            }
            return (key.includes('metadata.dataIndex') && value === item.dataIndex + 1)
        });
        if (nextDataIndex) {
            const [key] = nextDataIndex;
            const nextFieldFocused = key.replace("metadata.dataIndex", "metadata.isFieldFocused");
            const fPath = key.replace(".metadata.dataIndex", "").replace(/.fields/g, "");
            focusField.set(fPath);
            inputDataManager.modify(nextFieldFocused, true);
            const flattenObj = inputDataManager.get()
            const treeData = inputConverter.convert(unflatten(flattenObj));
            setState(treeData);
        }
    }
    const focusOnLastLeaf = (item: IInputModelTree) => {

    }
    const focusOnFirstLeaf = (item: IInputModelTree) => {

    }

    const initEvents = (item: IInputModelTree): IInitEventReturn => {
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
            },
            onArrowUp: (params: IEventPayload) => {
                focusOnPrevLeaf({ ...params, ...item });
            },
            onArrowDown: (params: IEventPayload) => {
                focusOnNextLeaf({ ...params, ...item });
            },
            onArrowRight: (params: IEventPayload) => {
                focusOnLastLeaf({ ...params, ...item });
            },
            onArrowLeft: (params: IEventPayload) => {
                focusOnFirstLeaf({ ...params, ...item })
            },
        }
    }

    const treeDataBuilder = useTreeDataBuilder(initEvents, hotkeys);

    React.useEffect(() => {
        if (!props.data) {
            return;
        }
        inputConverter.setKeysRef([])
        jsonIndexer.reset()
        const indexedData = jsonIndexer.process(props.data);

        inputDataManager.set(flatten<IData, Record<string, any>>(indexedData))
        const treeData = inputConverter.convert(indexedData);
        setState(treeData);
        console.log('inputDataManager.get()', inputDataManager.get())
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