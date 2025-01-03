import { List } from 'antd';
import { flatten } from 'flat';
import { cloneDeep, uniqueId } from 'lodash';
import React from 'react';
import { IEventPayload } from '../../../@types/components/atoms/IEventPayload';
import { IInputModelTree } from '../../../@types/IInputModelTree';
import { ILevelObject } from '../../../hooks/types';
import { useEditState } from '../../../hooks/useEditState';
import useFocusHelper from '../../../hooks/useFocusHelper';
import useInputDataManager from '../../../hooks/useInputDataManager';
import { useLevelManager } from '../../../hooks/useLevelManager';
import FieldNodeMolecules from '../../molecules/field-node';
import { IData } from './types/StateTypes';

interface InputModelOrganismProps {
    data: IData
}

const itemListStyle = { height: 26, padding: '0px 0px', color: '#0f6fac', borderBottom: '1px dashed rgb(114 162 192)', fontWeight: 'bold' };

const InputModelOrganism: React.FC<InputModelOrganismProps> = (props) => {
    const [state, setState] = React.useState<IInputModelTree[]>([]);
    const inputDataManager = useInputDataManager();
    // Focused Field
    const focusField = useFocusHelper('input-model-wrapper');
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
        // From the top to the current selected item.
        const head = state.filter((item) => item.index <= params.index);
        // the children of the selected node.
        const middle = state.filter((item) => (item.fPath !== params.fPath) && item.fPath.startsWith(params.fPath));
        const post = head.concat(middle);
        console.log(head.concat(middle).map(item => item.fPath))

        const tail = state.filter((item) => item.index > (post.length - 1)).map(item => {
            return { ...item, index: item.index + 1 };
        });
        const randomKey1 = Math.random().toFixed(3)
        const randomKey2 = Math.random().toFixed(4)
        console.log(uniqueId())
        const fieldname = `${params.fieldname}_${randomKey1}_${randomKey2}`;
        const newNode = {
            isDefaultValueEdit: false,
            isFieldEdit: false,
            prefix: params.prefix,
            disabled: false,
            level: params.level,
            fPath: params.fPath.slice(0, params.fPath.lastIndexOf('.')).concat(`.${fieldname}`),
            datatype: params.datatype,
            defaultValue: `defaultValue${randomKey1}_${randomKey2}`,
            fieldname,
            index: post.length
        }
        const newState = post.concat([newNode]).concat(tail);
        // const newState = head.concat(middle).concat([newNode]).concat(tail);
        setState(newState);
        // setSelectedNode(newNode)
    }


    React.useEffect(() => {
        if (!props.data) {
            return;
        }
        // Flatten data.
        const flattenData = flatten<IData, Record<string, any>>(props.data);
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
                if (e.altKey && selectedNode && e.code === 'Equal') {
                    onNextNewNode(selectedNode);
                    return;
                }
                if (e.code === 'ArrowDown' && selectedNode) {
                    e.preventDefault();
                    onArrowDown(selectedNode);
                    return;
                }
                if (e.code === 'ArrowUp' && selectedNode) {
                    e.preventDefault();
                    onArrowUp(selectedNode);
                    return;
                }
                if (e.code === 'ArrowLeft' && selectedNode) {
                    e.preventDefault();
                    onArrowLeft(selectedNode);
                    return;
                }
                if (e.code === 'ArrowRight' && selectedNode) {
                    e.preventDefault();
                    onArrowRight(selectedNode);
                    return;
                }
                if (e.code === 'KeyF' && selectedNode) {
                    e.preventDefault();
                    editState.enableEditMode(selectedNode);
                    const newState = state.map(item => {
                        if (item.index === selectedNode.index) {
                            return { ...item, isFieldEdit: true }
                        }
                        return item;
                    })
                    console.log(newState);
                    setState(newState)
                    return;
                }
                if (e.code === 'KeyD' && selectedNode) {
                    e.preventDefault();
                    editState.enableEditMode(selectedNode);
                    const newState = state.map(item => {
                        if (item.index === selectedNode.index) {
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
                style={{ border: '2px solid #0f6fac', width: 600, height: 1000, overflow: 'scroll' }}
                dataSource={state}
                renderItem={(item) => {
                    let focusedStyle: React.CSSProperties = {};
                    if (item.fPath === selectedNode?.fPath) {
                        focusedStyle = { backgroundColor: '#0f6fac', color: 'white !important' }
                    }
                    return (
                        <List.Item
                            onClick={() => {
                                setSelectedNode({ ...item })
                            }}
                            onContextMenu={() => {
                                setSelectedNode({ ...item })
                            }}
                            style={{ ...focusedStyle, ...itemListStyle }} >

                            <FieldNodeMolecules
                                {...item}
                                key={item.fPath}
                                selected={(selectedNode || { fPath: '' }) as ILevelObject}
                                onChange={(params: IEventPayload) => {
                                    const newState = state.map(item => {
                                        if (item.index !== selectedNode?.index) {
                                            return item;
                                        }
                                        return { ...item, ...params.update };
                                    })
                                    setState(newState)
                                }}
                                onDoubleClick={(params: IEventPayload) => {
                                    const newState = state.map(item => {
                                        if (item.index !== selectedNode?.index) {
                                            return item;
                                        }
                                        return { ...item, ...params.update };
                                    })
                                    setState(newState)
                                    editState.enableEditMode(item);
                                }}
                                cancel={(_: IEventPayload) => { }}
                                confirm={(params: IEventPayload) => {
                                    // const treeData = fieldChange.process({ ...params, ...item })
                                    const newState = state.map(item => {
                                        if (item.index !== selectedNode?.index) {
                                            return item;
                                        }
                                        return { ...item, ...params.update };
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


