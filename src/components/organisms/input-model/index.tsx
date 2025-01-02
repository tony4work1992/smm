import { List } from 'antd';
import { flatten } from 'flat';
import { cloneDeep } from 'lodash';
import React from 'react';
import { IEventPayload } from '../../../@types/components/atoms/IEventPayload';
import { IInputModelTree } from '../../../@types/IInputModelTree';
import { useEditState } from '../../../hooks/useEditState';
import { useFieldChange } from '../../../hooks/useFieldChange';
import useFocusHelper from '../../../hooks/useFocusHelper';
import useInputDataManager from '../../../hooks/useInputDataManager';
import useJsonIndexer from '../../../hooks/useJsonIndexer';
import { useLevelManager } from '../../../hooks/useLevelManager';
import useModelProcessor from '../../../hooks/useModelProcessor';
import { useNextTreeNode } from '../../../hooks/useStructureHandler/useNextTreeNode';
import FieldNodeMolecules from '../../molecules/field-node';
import { IData } from './types/StateTypes';

interface InputModelOrganismProps {
    data: IData
}

const itemListStyle = { height: 26, padding: '0px 0px', color: '#0f6fac', borderBottom: '1px dashed rgb(114 162 192)', fontWeight: 'bold' };

const InputModelOrganism: React.FC<InputModelOrganismProps> = (props) => {
    const [state, setState] = React.useState<IInputModelTree[]>([]);
    const inputDataManager = useInputDataManager();
    const modelProcessor = useModelProcessor();
    // Focused Field
    const focusField = useFocusHelper('input-model-wrapper');
    const jsonIndexer = useJsonIndexer();
    // New Node
    const nextTreeNode = useNextTreeNode(props.data);
    const fieldChange = useFieldChange({ focusField, inputDataManager, jsonIndexer, modelProcessor });
    const editState = useEditState();
    const levelManager = useLevelManager();
    const [selectedNode, setSelectedNode] = React.useState<IInputModelTree>();


    const onArrowUp = (params: IInputModelTree) => {
        const nextItem = state.find(item => item.index === (params.index - 1));
        if (nextItem) {
            setSelectedNode(nextItem);
        }
    }

    const onArrowDown = (params: IInputModelTree) => {
        const nextItem = state.find(item => item.index === (params.index + 1));
        if (nextItem) {
            setSelectedNode(nextItem)
        }
    }

    const onArrowLeft = (_: IInputModelTree) => {
        const nextItem = cloneDeep(state).shift();
        if (nextItem) {
            setSelectedNode(nextItem)
        }
    }

    const onArrowRight = (_: IInputModelTree) => {
        const nextItem = cloneDeep(state).pop();
        if (nextItem) {
            setSelectedNode(nextItem)
        }
    }

    // Create new tree node based on current node indicator
    const onNextNewNode = (params: IInputModelTree) => {
        jsonIndexer.reset()
        const indexedData = jsonIndexer.process(nextTreeNode.add(params));
        const flattenData = flatten<IData, Record<string, any>>(indexedData);
        inputDataManager.set(flattenData);
        levelManager.build(flattenData);
    }

    // const treeDataBuilder = useTreeDataBuilder(initEvents, hotkeys);

    React.useEffect(() => {
        if (!props.data) {
            return;
        }
        jsonIndexer.reset()
        const indexedData = jsonIndexer.process(props.data);
        const flattenData = flatten<IData, Record<string, any>>(indexedData);
        inputDataManager.set(flattenData);
        const treeData = levelManager.build(flattenData)
        setState(treeData);
    }, [])


    return (
        <div
            id={'input-model-wrapper'}
            tabIndex={0} // Make div focusable
            role='menuitem'
            onKeyUp={(e) => {
                if (editState.isEditing()) {
                    return;
                }
                if (e.code === 'ArrowDown' && selectedNode) {
                    e.preventDefault();
                    if (e.altKey) {
                        onNextNewNode(selectedNode);
                        return;
                    }
                    onArrowDown(selectedNode);
                }
                if (e.code === 'ArrowUp' && selectedNode) {
                    e.preventDefault();
                    onArrowUp(selectedNode);
                }
                if (e.code === 'ArrowLeft' && selectedNode) {
                    e.preventDefault();
                    onArrowLeft(selectedNode);
                }
                if (e.code === 'ArrowRight' && selectedNode) {
                    e.preventDefault();
                    onArrowRight(selectedNode);
                }
                if (e.code === 'KeyF' && selectedNode) {
                    e.preventDefault();
                    editState.enableEditMode(selectedNode);
                    const newState = state.map(item => {
                        if (item.dataIndex === selectedNode.dataIndex) {
                            return { ...item, isFieldEdit: true }
                        }
                        return item;
                    })
                    setState(newState)
                }
                if (e.code === 'KeyD' && selectedNode) {
                    e.preventDefault();
                    editState.enableEditMode(selectedNode);
                    const newState = state.map(item => {
                        if (item.dataIndex === selectedNode.dataIndex) {
                            return { ...item, isDefaultValueEdit: true }
                        }
                        return item;
                    })
                    setState(newState)
                }

            }}
            style={{ outline: 'none', display: 'flex', flexDirection: 'row' }} // Remove default focus outline
        >

            <List
                style={{ border: '2px solid #0f6fac' }}
                dataSource={state}
                renderItem={(item) => {
                    let focusedStyle: React.CSSProperties = {};
                    if (item.fPath === selectedNode?.fPath) {
                        focusedStyle = { backgroundColor: '#0f6fac', color: 'white !important' }
                    }
                    return (
                        <List.Item onClick={() => setSelectedNode({ ...item })} style={{ ...focusedStyle, ...itemListStyle }} >
                            <FieldNodeMolecules
                                key={item.fPath}
                                {...item}
                                hotkeys={[
                                    { event: 'onDoubleClick', key: 'KeyM' },
                                    { event: 'onArrowDown', key: 'ArrowDown' },
                                    { event: 'onArrowUp', key: 'ArrowUp' },
                                    { event: 'onArrowLeft', key: 'ArrowLeft' },
                                    { event: 'onArrowRight', key: 'ArrowRight' }
                                ]}
                                onChange={(params: IEventPayload) => {
                                    const treeData = fieldChange.process({ ...params, ...item })
                                    if (treeData) setState(treeData);
                                }}

                                onDoubleClick={(params: IEventPayload) => {
                                    const treeData = fieldChange.process({ ...params, ...item })
                                    editState.enableEditMode(item);
                                    if (treeData) setState(treeData);
                                }}
                                cancel={(params: IEventPayload) => { }}
                                confirm={(params: IEventPayload) => {
                                    // const treeData = fieldChange.process({ ...params, ...item })
                                    const newState = state.map(item => {
                                        if (item.dataIndex !== selectedNode?.dataIndex) {
                                            return item;
                                        }
                                        params.update.forEach((ele) => {
                                            (item as any)[ele.key] = ele.value
                                        })
                                        return item;
                                    })
                                    setState(newState)
                                    editState.disableEditMode();
                                    focusField.focus();
                                    console.log(document.activeElement, 'document.activeElement', focusField.get().current)
                                }}

                            />
                        </List.Item>);
                }} />
        </div >
    );
};


export default InputModelOrganism


