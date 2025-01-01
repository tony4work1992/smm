import { ConfigProvider, GetProps, Tree } from 'antd';
import { EventDataNode } from 'antd/es/tree';
import { flatten } from 'flat';
import React from 'react';
import { IEventPayload } from '../../../@types/components/atoms/IEventPayload';
import { IInputModelTree } from '../../../@types/IInputModelTree';
import { useEditState } from '../../../hooks/useEditState';
import { useFieldChange } from '../../../hooks/useFieldChange';
import { useDirectFocus } from '../../../hooks/useFocusHandler/useDirectFocus';
import { useHeadFieldFocus } from '../../../hooks/useFocusHandler/useHeadFieldFocus';
import { useNextFieldFocus } from '../../../hooks/useFocusHandler/useNextFieldFocus';
import { usePrevFieldFocus } from '../../../hooks/useFocusHandler/usePrevFieldFocus';
import { useTrailFieldFocus } from '../../../hooks/useFocusHandler/useTrailFieldFocus';
import useFocusPath from '../../../hooks/useFocusPath';
import useInputConverter from '../../../hooks/useInputConverter';
import useInputDataManager from '../../../hooks/useInputDataManager';
import useJsonIndexer from '../../../hooks/useJsonIndexer';
import useModelProcessor from '../../../hooks/useModelProcessor';
import useTreeDataBuilder, { IInitEventReturn } from '../../../hooks/useTreeDataBuilder';
import { hotkeys } from './constants/HotKeyConfig';
import { IData } from './types/StateTypes';

interface InputModelOrganismProps {
    data: IData
}

type TreeProps = GetProps<typeof Tree>;


const InputModelOrganism: React.FC<InputModelOrganismProps> = (props) => {
    const [state, setState] = React.useState<IInputModelTree[]>([]);
    const inputDataManager = useInputDataManager();
    const modelProcessor = useModelProcessor();
    const inputConverter = useInputConverter();
    // Focused Field
    const focusField = useFocusPath();
    const jsonIndexer = useJsonIndexer();
    const nextFieldFocus = useNextFieldFocus({ focusField, inputConverter, inputDataManager, jsonIndexer, modelProcessor })
    const prevFieldFocus = usePrevFieldFocus({ focusField, inputConverter, inputDataManager, jsonIndexer, modelProcessor })
    const headFieldFocus = useHeadFieldFocus({ focusField, inputConverter, inputDataManager, jsonIndexer, modelProcessor })
    const trailFieldFocus = useTrailFieldFocus({ focusField, inputConverter, inputDataManager, jsonIndexer, modelProcessor })
    const fieldChange = useFieldChange({ focusField, inputConverter, inputDataManager, jsonIndexer, modelProcessor });
    const directFocus = useDirectFocus({ focusField, inputConverter, inputDataManager, jsonIndexer, modelProcessor });
    const [selectedNode, setSelectedNode] = React.useState<{ key: React.Key, info: EventDataNode<IInputModelTree> }>();
    const editState = useEditState();

    const initEvents = (item: IInputModelTree): IInitEventReturn => {
        return {
            onChange: (params: IEventPayload) => {
                const treeData = fieldChange.process({ ...params, ...item })
                if (treeData) setState(treeData);
            },
            onBlur: (params: IEventPayload) => {
                const treeData = fieldChange.process({ ...params, ...item })
                if (treeData) {
                    setState(treeData)
                    editState.disableEditMode();
                    focusField.focus();
                };
            },
            onDoubleClick: (params: IEventPayload) => {
                const treeData = fieldChange.process({ ...params, ...item })
                editState.enableEditMode(item);
                if (treeData) setState(treeData);
            },
            onPressEnter: (params: IEventPayload) => {
                const treeData = fieldChange.process({ ...params, ...item })
                if (treeData) {
                    setState(treeData)
                    editState.disableEditMode();
                    focusField.focus();
                }
            },
            onClick: (params: IEventPayload) => {
                // Reset
                directFocus.process({ ...params, ...item });
                const treeData = fieldChange.process({ ...params, ...item })
                if (treeData) setState(treeData);
            },

        }
    }

    const onArrowUp = (params: EventDataNode<IInputModelTree>) => {
        if (prevFieldFocus.validate({ dataIndex: params.dataIndex })) {
            const prevField = prevFieldFocus.findPrevField(params)
            setSelectedNode({ key: prevField.fPath || '', info: prevField as any })
        }
    }

    const onArrowDown = (params: EventDataNode<IInputModelTree>) => {
        if (nextFieldFocus.validate({ dataIndex: params.dataIndex })) {
            const nextField = nextFieldFocus.findNextField(params);
            setSelectedNode({ key: nextField.fPath || '', info: nextField as any })
        }
    }

    const onArrowLeft = (params: EventDataNode<IInputModelTree>) => {
        if (headFieldFocus.validate({ dataIndex: params.dataIndex })) {
            const headField = headFieldFocus.findHeadField(params);
            setSelectedNode({ key: headField.fPath || '', info: headField as any })
        }
    }

    const onArrowRight = (params: EventDataNode<IInputModelTree>) => {
        if (trailFieldFocus.validate({ dataIndex: params.dataIndex })) {
            const trailField = trailFieldFocus.findTrailField(params);
            setSelectedNode({ key: trailField.fPath || '', info: trailField as any })
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
    }, [])

    const onSelect: TreeProps['onSelect'] = (keys, info) => {
        if (keys.length === 0) {
            return;
        }
        setSelectedNode({ key: keys[0], info: info.node as any })
    };

    return (
        <div
            tabIndex={0} // Make div focusable
            onKeyDown={(e) => {
                console.log(selectedNode);
                if (editState.isEditing()) {
                    return;
                }
                if (e.code === 'ArrowDown' && selectedNode?.info) {
                    e.preventDefault();
                    onArrowDown(selectedNode?.info);
                }
                if (e.code === 'ArrowUp' && selectedNode?.info) {
                    e.preventDefault();
                    console.log(selectedNode?.info);
                    onArrowUp(selectedNode?.info);
                }
                if (e.code === 'ArrowLeft' && selectedNode?.info) {
                    e.preventDefault();
                    onArrowLeft(selectedNode?.info);
                }
                if (e.code === 'ArrowRight' && selectedNode?.info) {
                    e.preventDefault();
                    onArrowRight(selectedNode?.info);
                }
            }}
            style={{ outline: 'none' }} // Remove default focus outline
        >
            <ConfigProvider
                theme={{
                    components: {
                        Tree: {
                            nodeSelectedBg: '#99d8ff',
                            colorText: 'white',
                        }
                    },
                    token: {},
                }}
            >
                <Tree
                    style={{ background: 'rgb(0, 61, 99)' }}
                    switcherIcon={<></>}
                    onSelect={onSelect}
                    selectable={true}
                    blockNode={true}
                    selectedKeys={[selectedNode?.key || '']}
                    // draggable
                    expandedKeys={inputConverter.getKeys()}
                    // defaultExpandedKeys={inputConverter.getKeys()}
                    treeData={treeDataBuilder.build(state)}
                >

                </Tree >
            </ConfigProvider>
        </div >
    );
};

export default InputModelOrganism;