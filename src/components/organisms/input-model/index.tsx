import { ConfigProvider, GetProps, List, Tree } from 'antd';
import { EventDataNode } from 'antd/es/tree';
import { flatten } from 'flat';
import React from 'react';
import { ThemeStyles } from '../../../@constants/theme-styles/ThemeStyles';
import { IEventPayload } from '../../../@types/components/atoms/IEventPayload';
import { IInputModelTree } from '../../../@types/IInputModelTree';
import { useEditState } from '../../../hooks/useEditState';
import { useEditToggle } from '../../../hooks/useEditToggle';
import { useFieldChange } from '../../../hooks/useFieldChange';
import { useHeadFieldFocus } from '../../../hooks/useFocusHandler/useHeadFieldFocus';
import { useNextFieldFocus } from '../../../hooks/useFocusHandler/useNextFieldFocus';
import { usePrevFieldFocus } from '../../../hooks/useFocusHandler/usePrevFieldFocus';
import { useTrailFieldFocus } from '../../../hooks/useFocusHandler/useTrailFieldFocus';
import useFocusHelper from '../../../hooks/useFocusHelper';
import useInputConverter from '../../../hooks/useInputConverter';
import useInputDataManager from '../../../hooks/useInputDataManager';
import useJsonIndexer from '../../../hooks/useJsonIndexer';
import { useLevelManager } from '../../../hooks/useLevelManager';
import useModelProcessor from '../../../hooks/useModelProcessor';
import useTreeDataBuilder, { IInitEventReturn } from '../../../hooks/useTreeDataBuilder';
import { useListValidator } from '../../../hooks/useValueValidators/useListValidator';
import { useObjectValidator } from '../../../hooks/useValueValidators/useObjectValidator';
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
    const focusField = useFocusHelper('input-model-wrapper');
    const jsonIndexer = useJsonIndexer();
    const nextFieldFocus = useNextFieldFocus({ focusField, inputConverter, inputDataManager, jsonIndexer, modelProcessor })
    const prevFieldFocus = usePrevFieldFocus({ focusField, inputConverter, inputDataManager, jsonIndexer, modelProcessor })
    const headFieldFocus = useHeadFieldFocus({ focusField, inputConverter, inputDataManager, jsonIndexer, modelProcessor })
    const trailFieldFocus = useTrailFieldFocus({ focusField, inputConverter, inputDataManager, jsonIndexer, modelProcessor })
    const fieldChange = useFieldChange({ focusField, inputConverter, inputDataManager, jsonIndexer, modelProcessor });
    const editToggle = useEditToggle({ focusField, inputConverter, inputDataManager, jsonIndexer, modelProcessor });
    const editState = useEditState();
    const levelManager = useLevelManager();
    const objectValidator = useObjectValidator();
    const listValidator = useListValidator();
    const [selectedNode, setSelectedNode] = React.useState<{ key: React.Key, info: EventDataNode<IInputModelTree> }>();

    const initEvents = (item: IInputModelTree): IInitEventReturn => {
        return {
            onChange: (params: IEventPayload) => {
                const treeData = fieldChange.process({ ...params, ...item })
                if (treeData) setState(treeData);
            },
            onDoubleClick: (params: IEventPayload) => {
                const treeData = fieldChange.process({ ...params, ...item })
                editState.enableEditMode(item);
                if (treeData) setState(treeData);
            },
            cancel: (params: IEventPayload) => {
                const treeData = fieldChange.process({ ...params, ...item })
                if (treeData) {
                    setState(treeData)
                    editState.disableEditMode();
                    focusField.focus();
                    console.log(document.activeElement, 'document.activeElement', focusField.get().current)
                }
            },
            confirm: (params: IEventPayload) => {
                const treeData = fieldChange.process({ ...params, ...item })
                if (treeData) {
                    setState(treeData)
                    editState.disableEditMode();
                    focusField.focus();
                    console.log(document.activeElement, 'document.activeElement', focusField.get().current)
                }
            }

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
        const flattenData = flatten<IData, Record<string, any>>(indexedData);
        inputDataManager.set(flattenData);
        const treeData = inputConverter.convert(indexedData);
        levelManager.build(flattenData)
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
            id={'input-model-wrapper'}
            tabIndex={0} // Make div focusable
            onKeyDown={(e) => {
                if (editState.isEditing()) {
                    return;
                }
                if (e.code === 'ArrowDown' && selectedNode?.info) {
                    e.preventDefault();
                    onArrowDown(selectedNode?.info);
                }
                if (e.code === 'ArrowUp' && selectedNode?.info) {
                    e.preventDefault();

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
                if (e.code === 'KeyF' && selectedNode?.info) {
                    e.preventDefault();
                    editState.enableEditMode(selectedNode?.info);
                    const unflattenData = editToggle.editFieldName(selectedNode?.info);
                    setState(unflattenData)
                }
                if (e.code === 'KeyD' && selectedNode?.info) {
                    e.preventDefault();
                    const isObject = objectValidator.isObjectDatatype(selectedNode?.info.datatype);
                    const isList = listValidator.isListDatatype(selectedNode?.info.datatype);
                    if (isObject || isList) {
                        return;
                    }
                    editState.enableEditMode(selectedNode?.info);
                    const unflattenData = editToggle.editDefaultValue(selectedNode?.info);
                    setState(unflattenData)
                }
            }}
            style={{ outline: 'none', display: 'flex', flexDirection: 'row', border: '2px solid #014f80' }} // Remove default focus outline
        >
            <ConfigProvider
                theme={{
                    components: {
                        Tree: {
                            nodeSelectedBg: ThemeStyles.BACKGROUND_LEVEL_5,
                            colorText: 'white',
                            titleHeight: 25
                        },
                    },
                    token: {},
                }}
            >
                <List style={{ background: 'rgb(13 111 172)' }} dataSource={levelManager.get()} renderItem={(item) => {
                    return <List.Item style={{ height: 26, padding: '0px 4px', marginBottom: 0, color: 'white', borderBottom: '1px dashed rgb(114 162 192)', fontWeight: 'bold', background: (ThemeStyles.getBgForLevel(item.level)) }} >{item.prefix}{item.level}</List.Item>;
                }} />
                <Tree
                    // style={{ background: 'rgb(0, 61, 99)' }}
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

