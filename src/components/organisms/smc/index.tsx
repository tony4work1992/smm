import { CaretDownOutlined, CaretLeftOutlined, CaretRightOutlined, CaretUpOutlined, CloseCircleFilled, DeleteFilled, EditOutlined, FormOutlined, MenuFoldOutlined, PlusCircleFilled, SaveOutlined } from '@ant-design/icons';
import { Button, Flex, Tag } from 'antd';
import React from 'react';
import { EventTypes } from '../../../@constants/event-types';
import { PanelTypes } from '../../../@constants/panels/PanelTypes';
import { IInputModelTree } from '../../../types';
import { ISmartModelControlProps } from '../../../types/components/organisms/ISmartModelControl';
import { EventBus } from '../../../utilities/mitt';

const SmartModelControl: React.FC<ISmartModelControlProps> = (props) => {

    const [selectedNode, setSelectedNode] = React.useState<IInputModelTree & { isLast?: boolean, isFirst?: boolean }>();

    React.useEffect(() => {

        const onNodeSelected = (selectedNode: any) => {
            console.clear();
            console.log(selectedNode)
            setSelectedNode(selectedNode as IInputModelTree);
        }
        EventBus.on(EventTypes.REACT_WITH_CANCEL, onNodeSelected);
        EventBus.on(EventTypes.REACT_WITH_UP, onNodeSelected);
        EventBus.on(EventTypes.REACT_WITH_DOWN, onNodeSelected);
        EventBus.on(EventTypes.REACT_WITH_LEFT, onNodeSelected);
        EventBus.on(EventTypes.REACT_WITH_RIGHT, onNodeSelected);
        EventBus.on(EventTypes.REACT_WITH_EDIT_DEFAULT_VALUE, onNodeSelected);
        EventBus.on(EventTypes.REACT_WITH_EDIT_FIELD, onNodeSelected);
        EventBus.on(EventTypes.REACT_WITH_CONFIRM, onNodeSelected);
        EventBus.on(EventTypes.REACT_WITH_CLICK, onNodeSelected);

        return () => {
            EventBus.off(EventTypes.CANCEL, onNodeSelected);
            EventBus.off(EventTypes.UP, onNodeSelected);
            EventBus.off(EventTypes.DOWN, onNodeSelected);
            EventBus.off(EventTypes.LEFT, onNodeSelected);
            EventBus.off(EventTypes.RIGHT, onNodeSelected);
            EventBus.off(EventTypes.EDIT_DEFAULT_VALUE, onNodeSelected);
            EventBus.off(EventTypes.EDIT_FIELD, onNodeSelected);
            EventBus.off(EventTypes.REACT_WITH_CONFIRM, onNodeSelected);
            EventBus.off(EventTypes.REACT_WITH_CLICK, onNodeSelected);
        }
    }, []);

    const isUpBtnDisabled = React.useMemo(() => {
        if (selectedNode?.isFieldEdit || selectedNode?.isDefaultValueEdit) {
            return true;
        }
        if (selectedNode?.isFirst) {
            return true;
        }
        return false;
    }, [Object.values(selectedNode || {})]);

    const isDownBtnDisabled = React.useMemo(() => {
        if (selectedNode?.isFieldEdit || selectedNode?.isDefaultValueEdit) {
            return true;
        }
        if (selectedNode?.isLast) {
            return true;
        }
        return false;
    }, [Object.values(selectedNode || {})]);

    const isLeftBtnDisabled = React.useMemo(() => {
        if (selectedNode?.isFieldEdit || selectedNode?.isDefaultValueEdit) {
            return true;
        }
        if (selectedNode?.isFirst) {
            return true;
        }
        return false;
    }, [Object.values(selectedNode || {})]);

    const isRightBtnDisabled = React.useMemo(() => {
        if (selectedNode?.isFieldEdit || selectedNode?.isDefaultValueEdit) {
            return true;
        }
        if (selectedNode?.isLast) {
            return true;
        }
        return false;
    }, [Object.values(selectedNode || {})]);

    const isAddBtnDisabled = React.useMemo(() => {
        if (selectedNode?.isFieldEdit || selectedNode?.isDefaultValueEdit) {
            return true;
        }
        return false;
    }, [Object.values(selectedNode || {})]);

    const isDeleteBtnDisabled = React.useMemo(() => {
        if (selectedNode?.isFieldEdit || selectedNode?.isDefaultValueEdit) {
            return true;
        }
        return false;
    }, [Object.values(selectedNode || {})]);

    const isEditFieldBtnDisabled = React.useMemo(() => {
        if (selectedNode?.isFieldEdit || selectedNode?.isDefaultValueEdit) {
            return true;
        }
        return false;
    }, [Object.values(selectedNode || {})]);

    const isEditDefaultValueBtnDisabled = React.useMemo(() => {
        if (selectedNode?.isFieldEdit || selectedNode?.isDefaultValueEdit) {
            return true;
        }
        if (['Object', 'List'].includes(selectedNode?.datatype || '')) {
            return true;
        }
        return false;
    }, [selectedNode?.isFieldEdit, selectedNode?.isDefaultValueEdit, selectedNode?.datatype]);

    const isCancelBtnDisabled = React.useMemo(() => {
        if (selectedNode?.isFieldEdit || selectedNode?.isDefaultValueEdit) {
            return false;
        }
        return true;
    }, [Object.values(selectedNode || {})]);


    return (
        <Flex
            gap={10}
            align="center"
            style={{
                marginBottom: 10,
                border: "1px dashed blue",
                padding: 5,
                borderRadius: 5,
                background: "aliceblue",
            }}
        >
            <Flex justify={'space-between'}>
                <Flex gap={5}>
                    {props.activePanel === 'SOURCE_MODEL' && (
                        <Tag color="green-inverse" style={{ fontSize: 19, padding: '5px 10px 5px 10px', width: 200 }}>
                            <MenuFoldOutlined style={{ marginRight: 5 }} />Source Model
                        </Tag>)}
                    {props.activePanel === 'PATH_MAPPER' && (
                        <Tag color="blue-inverse" style={{ fontSize: 19, padding: '5px 10px 5px 10px', width: 200 }}>
                            <MenuFoldOutlined style={{ marginRight: 5 }} />Path Mapper
                        </Tag>)}
                    {props.activePanel === 'DESTINATION_MODEL' && (
                        <Tag color="pink-inverse" style={{ fontSize: 19, padding: '5px 10px 5px 10px', width: 200 }}>
                            <MenuFoldOutlined style={{ marginRight: 5 }} />Destination Model
                        </Tag>)}
                    {props.activePanel === PanelTypes.NONE && (
                        <Tag color="lime-inverse" style={{ fontSize: 19, padding: '5px 10px 5px 10px', width: 200 }}>
                            <MenuFoldOutlined style={{ marginRight: 5 }} /> {"None"}
                        </Tag>)}

                </Flex>
                <Flex gap={5} style={{ marginRight: 25 }}>
                    <Button
                        title="Arrow Up"
                        color='primary'
                        variant='dashed'
                        style={{ width: 120 }}
                        disabled={isUpBtnDisabled}
                        onMouseDown={(e) => {
                            // This is very important to stop out focus from the current active panel
                            e.preventDefault();
                            e.stopPropagation();
                            EventBus.emit(EventTypes.UP)
                        }}>
                        <CaretUpOutlined style={{ marginRight: 5 }} />Up
                    </Button>
                    <Button
                        title="Arrow Down"
                        color='primary'
                        variant='dashed'
                        style={{ width: 120 }}
                        disabled={isDownBtnDisabled}
                        onMouseDown={(e) => {
                            // This is very important to stop out focus from the current active panel
                            e.preventDefault();
                            e.stopPropagation();
                            EventBus.emit(EventTypes.DOWN)
                        }}>
                        <CaretDownOutlined style={{ marginRight: 5 }} />Down
                    </Button>
                    <Button
                        title="Arrow Left"
                        color='primary'
                        variant='dashed'
                        style={{ width: 120 }}
                        disabled={isLeftBtnDisabled}
                        onMouseDown={(e) => {
                            // This is very important to stop out focus from the current active panel
                            e.preventDefault();
                            e.stopPropagation();
                            EventBus.emit(EventTypes.LEFT)
                        }}>
                        <CaretLeftOutlined style={{ marginRight: 5 }} />First
                    </Button>
                    <Button
                        title="Arrow Right"
                        color='primary'
                        variant='dashed'
                        style={{ width: 120 }}
                        disabled={isRightBtnDisabled}
                        onMouseDown={(e) => {
                            // This is very important to stop out focus from the current active panel
                            e.preventDefault();
                            e.stopPropagation();
                            EventBus.emit(EventTypes.RIGHT)
                        }}>
                        <CaretRightOutlined style={{ marginRight: 5 }} />Last
                    </Button>
                </Flex>
                <Flex gap={5} style={{ marginRight: 25 }}>
                    <Button
                        title="Alt + (=)"
                        color='primary'
                        variant='dashed'
                        style={{ width: 120 }}
                        disabled={isAddBtnDisabled}
                        onMouseDown={(e) => {
                            // This is very important to stop out focus from the current active panel
                            e.preventDefault();
                            e.stopPropagation();
                            EventBus.emit(EventTypes.ADD)
                        }}>
                        <PlusCircleFilled style={{ marginRight: 5 }} />Add
                    </Button>
                    <Button
                        title="Alt + (-)"
                        color='danger'
                        variant='dashed'
                        style={{ width: 120 }}
                        disabled={isDeleteBtnDisabled}
                        onMouseDown={(e) => {
                            // This is very important to stop out focus from the current active panel
                            e.preventDefault();
                            e.stopPropagation();
                            EventBus.emit(EventTypes.DELETE)
                        }}>
                        <DeleteFilled style={{ marginRight: 5 }} />Delete
                    </Button>
                </Flex>
                <Flex gap={5} style={{ marginRight: 25 }}>
                    <Button
                        title="Alt + F"
                        color='primary'
                        variant='dashed'
                        style={{ width: 120 }}
                        disabled={isEditFieldBtnDisabled}
                        onMouseDown={(e) => {
                            // This is very important to stop out focus from the current active panel
                            e.preventDefault();
                            e.stopPropagation();
                            EventBus.emit(EventTypes.EDIT_FIELD)
                        }}>
                        <FormOutlined style={{ marginRight: 5 }} />Edit Field
                    </Button>
                    <Button
                        title="Alt + D"
                        color='primary'
                        variant='dashed'
                        style={{ width: 120 }}
                        disabled={isEditDefaultValueBtnDisabled}
                        onMouseDown={(e) => {
                            // This is very important to stop out focus from the current active panel
                            e.preventDefault();
                            e.stopPropagation();
                            EventBus.emit(EventTypes.EDIT_DEFAULT_VALUE)
                        }}>
                        <EditOutlined style={{ marginRight: 5 }} />Edit D.Value
                    </Button>
                </Flex>
                <Flex gap={5} style={{ marginRight: 25 }}>
                    <Button
                        title="Escape"
                        color='primary'
                        variant='dashed'
                        style={{ width: 120 }}
                        disabled={isCancelBtnDisabled}
                        onMouseDown={(e) => {
                            // This is very important to stop out focus from the current active panel
                            e.preventDefault();
                            e.stopPropagation();
                            EventBus.emit(EventTypes.CANCEL)
                        }}>
                        <CloseCircleFilled style={{ marginRight: 5 }} />Cancel
                    </Button>
                </Flex>
            </Flex>
            <Flex gap={5} justify='flex-end' style={{ width: '100%' }}>
                <Button title="Escape" color='primary' variant='outlined' style={{ width: 150 }}>
                    <CloseCircleFilled style={{ marginRight: 5 }} />Discard
                </Button>
                <Button title="Enter" color='primary' variant='solid' style={{ width: 150 }}>
                    <SaveOutlined style={{ marginRight: 5 }} />Save
                </Button>
            </Flex>
        </Flex>
    )
}

export default SmartModelControl;