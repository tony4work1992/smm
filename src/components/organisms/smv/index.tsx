import { List } from "antd";
import { flatten } from "flat";
import _, { cloneDeep } from "lodash";
import React from "react";
import { useClickAway } from "react-use";
import { EventTypes } from "../../../@constants/event-types";
import { PanelTypes } from "../../../@constants/panels/PanelTypes";
import { ILevelObject } from "../../../hooks/types";
import { useEditState } from "../../../hooks/useEditState";
import useFocusHelper from "../../../hooks/useFocusHelper";
import useInputDataManager from "../../../hooks/useInputDataManager";
import { useLevelManager } from "../../../hooks/useLevelManager";
import { IEventPayload } from "../../../types/components/atoms/IEventPayload";
import {
  IData,
  SmartModelVisualizerProps,
} from "../../../types/components/organisms/ISmartModelVisualizer";
import { IInputModelTree } from "../../../types/IInputModelTree";
import { EventBus } from "../../../utilities/mitt";
import FieldNodeMolecules from "../../molecules/field-node";

const itemListStyle = {
  padding: "0px 0px",
  color: "#0f6fac",
  borderBottom: "1px dashed rgb(114 162 192)",
  fontWeight: "bold",
};

const SmartModelVisualizer: React.FC<
  SmartModelVisualizerProps<IInputModelTree>
> = (props) => {
  const [state, setState] = React.useState<IInputModelTree[]>([]);
  const inputDataManager = useInputDataManager();
  // Focused Field
  const focusField = useFocusHelper("input-model-wrapper");
  const editState = useEditState();
  const levelManager = useLevelManager();
  const [selectedNode, setSelectedNode] = React.useState<IInputModelTree>();
  const [selectingNode, setSelectingNode] = React.useState<IInputModelTree>();
  const containerRef = React.useRef<HTMLDivElement>(null);

  useClickAway(containerRef, () => {
    // Only process click away when the panel is focusing, else do nothing.
    if (!selectedNode) {
      return;
    }
    setSelectedNode(undefined);
    props.setActivePanel(PanelTypes.NONE);
  });

  const onArrowUp = (selectedNode: IInputModelTree) => {
    const nextItem = state.find(
      (item) => item.index === selectedNode.index - 1,
    );

    if (nextItem) {
      setSelectedNode(nextItem);
      EventBus.emit(EventTypes.REACT_WITH_UP, nextItem);
      return;
    }
    // Run when there is no longer node upper.
    EventBus.emit(EventTypes.REACT_WITH_UP, { ...selectedNode, isFirst: true });
  };

  const onArrowDown = (selectedNode: IInputModelTree) => {
    const nextItem = state.find(
      (item) => item.index === selectedNode.index + 1,
    );

    if (nextItem) {
      EventBus.emit(EventTypes.REACT_WITH_DOWN, nextItem);
      setSelectedNode(nextItem);
      return;
    }
    // Run when there is no longer node below.
    EventBus.emit(EventTypes.REACT_WITH_DOWN, {
      ...selectedNode,
      isLast: true,
    });
  };

  const onArrowLeft = (_: IInputModelTree) => {
    const nextItem = cloneDeep(state).shift();
    if (nextItem) {
      setSelectedNode(nextItem);
      // Always run
      EventBus.emit(EventTypes.REACT_WITH_LEFT, { ...nextItem, isFirst: true });
      return;
    }
  };

  const onArrowRight = (_: IInputModelTree) => {
    const nextItem = cloneDeep(state).pop();
    if (nextItem) {
      setSelectedNode(nextItem);
      // Always run
      EventBus.emit(EventTypes.REACT_WITH_RIGHT, { ...nextItem, isLast: true });
      return;
    }
  };

  /**
   * Update data state of the smart-path-mapper
   * @param params
   * @returns
   */
  const onModelChange = (params: {
    item: IInputModelTree | undefined;
    data: IInputModelTree[];
  }) => {
    // Prepare state to pass to the page level
    const { data, item } = params;
    if (item === undefined) {
      return;
    }
    props.onModelChange?.({ item, data });
  };

  // Create new tree node based on current node indicator
  const addNewNode = (params: IInputModelTree, isChild: boolean) => {
    // From the top to the current selected item.
    const head = state.filter((item) => item.index <= params.index);
    // the children of the selected node.
    const middle = state.filter(
      (item) =>
        item.fPath !== params.fPath && item.fPath.startsWith(params.fPath),
    );
    const post = head.concat(middle);

    const tail = state
      .filter((item) => item.index > post.length - 1)
      .map((item) => {
        return { ...item, index: item.index + 1 };
      });
    const randomKey1 = Math.random().toFixed(3);
    const randomKey2 = Math.random().toFixed(4);
    const fieldname = `${params.fieldname}_${randomKey1}_${randomKey2}`;
    const newNode = {
      isDefaultValueEdit: false,
      isFieldEdit: false,
      prefix: params.prefix,
      disabled: false,
      level: isChild ? params.level + 1 : params.level,
      fPath: params.fPath
        .slice(0, params.fPath.lastIndexOf("."))
        .concat(`.${fieldname}`),
      datatype: params.datatype,
      defaultValue: `defaultValue${randomKey1}_${randomKey2}`,
      fieldname,
      index: post.length,
      height: _.isNil(props.rowHeight) ? 0 : props.rowHeight,
    };
    const newState = post.concat([newNode]).concat(tail);
    setState(newState);
    onModelChange({ item: selectedNode, data: newState });
  };

  const onDelete = (params: IInputModelTree) => {
    if (state.length <= 1) {
      return;
    }
    const newState = _.cloneDeep(state)
      .filter((item) => {
        const isDeleteItem = item.index === params.index;
        const isChild =
          item.fPath !== params.fPath &&
          item.fPath.startsWith(`${params.fPath}.`);
        return !isChild && !isDeleteItem;
      })
      .map((item, index) => ({ ...item, index }));
    const prevNode = newState.find((item) => item.index === params.index - 1);
    if (prevNode) {
      setState(newState);
      /** @NOTE React Batch update mechanism is not working properly, so setTimeout here intentionally */
      setTimeout(() => {
        setSelectedNode({ ...prevNode });
        onModelChange({ item: prevNode, data: newState });
      }, 100);
      return;
    }
  };

  const onEditField = (selectedNode: IInputModelTree) => {
    editState.enableEditMode();
    const newState = state.map((item) => {
      if (item.index === selectedNode.index) {
        return { ...item, isFieldEdit: true };
      }
      return item;
    });

    EventBus.emit(EventTypes.REACT_WITH_EDIT_FIELD, {
      ...selectedNode,
      isFieldEdit: true,
    });
    setState(newState);
    onModelChange({ item: selectedNode, data: newState });
  };

  const onEditDefaultValue = (selectedNode: IInputModelTree) => {
    /** @NOTE If data type is object, then do not allow to modify default value. */
    if (["Object", "List"].includes(selectedNode?.datatype || "")) {
      return;
    }
    editState.enableEditMode();
    const newState = state.map((item) => {
      if (item.index === selectedNode.index) {
        return { ...item, isDefaultValueEdit: true };
      }
      return item;
    });
    EventBus.emit(EventTypes.REACT_WITH_EDIT_DEFAULT_VALUE, {
      ...selectedNode,
      isDefaultValueEdit: true,
    });
    setState(newState);
  };

  const onCancelEditing = (selectedNode: IInputModelTree) => {
    const newState = state.map((item) => {
      if (item.index !== selectedNode.index) {
        return item;
      }
      return { ...item, isDefaultValueEdit: false, isFieldEdit: false };
    });
    editState.disableEditMode();
    EventBus.emit(EventTypes.REACT_WITH_CANCEL, {
      ...selectedNode,
      isDefaultValueEdit: false,
      isFieldEdit: false,
    });
    setState(newState);
    focusField.focus();
  };

  const onConfirmEditing = (params: IEventPayload) => {
    const newState = state.map((item) => {
      if (item.index !== selectedNode?.index) {
        return item;
      }
      EventBus.emit(EventTypes.REACT_WITH_CONFIRM, {
        ...item,
        ...params.update,
      });

      // Update fPath if update fieldName
      if (params.update?.fieldname) {
        params.update.fPath = _.replace(
          item.fPath,
          item.fieldname,
          params.update.fieldname,
        );
      }

      return { ...item, ...params.update };
    });
    setState(newState);
    editState.disableEditMode();
    focusField.focus();
    onModelChange({ item: selectedNode, data: newState });
  };

  React.useEffect(() => {
    if (!props.data) {
      return;
    }
    // Flatten data.
    const flattenData = flatten<IData, Record<string, any>>(props.data);
    inputDataManager.set(flattenData);
    const treeData = levelManager.build(flattenData);
    onModelChange({ item: treeData[0], data: treeData });
    setState(treeData);
  }, []);

  React.useEffect(() => {
    const handleArrowUp = () => {
      if (selectedNode) onArrowUp(selectedNode);
    };
    EventBus.on(EventTypes.UP, handleArrowUp);

    const handleArrowDown = () => {
      if (selectedNode) onArrowDown(selectedNode);
    };
    EventBus.on(EventTypes.DOWN, handleArrowDown);

    const handleArrowLeft = () => {
      if (selectedNode) onArrowLeft(selectedNode);
    };
    EventBus.on(EventTypes.LEFT, handleArrowLeft);

    const handleArrowRight = () => {
      if (selectedNode) onArrowRight(selectedNode);
    };
    EventBus.on(EventTypes.RIGHT, handleArrowRight);

    const handleAddNode = () => {
      if (selectedNode) addNewNode(selectedNode, false);
    };
    EventBus.on(EventTypes.ADD, handleAddNode);

    const handleDeleteNode = () => {
      if (selectedNode) onDelete(selectedNode);
    };
    EventBus.on(EventTypes.DELETE, handleDeleteNode);

    const handleEditField = () => {
      if (selectedNode) onEditField(selectedNode);
    };
    EventBus.on(EventTypes.EDIT_FIELD, handleEditField);

    const handleEditDefaultValue = () => {
      if (selectedNode) onEditDefaultValue(selectedNode);
    };
    EventBus.on(EventTypes.EDIT_DEFAULT_VALUE, handleEditDefaultValue);

    const handleCancelEditing = () => {
      if (selectedNode) onCancelEditing(selectedNode);
    };
    EventBus.on(EventTypes.CANCEL, handleCancelEditing);

    return () => {
      EventBus.off(EventTypes.UP, handleArrowUp);
      EventBus.off(EventTypes.DOWN, handleArrowDown);
      EventBus.off(EventTypes.LEFT, handleArrowLeft);
      EventBus.off(EventTypes.RIGHT, handleArrowRight);
      EventBus.off(EventTypes.ADD, handleAddNode);
      EventBus.off(EventTypes.DELETE, handleDeleteNode);
    };
    // @Note: Always takes 2 dependencies, because they change when doing actions.
  }, [selectedNode?.fPath, state.length]);

  const renderItem = (item: IInputModelTree) => {
    let focusedStyle: React.CSSProperties = { height: props.height };
    if (selectingNode?.fPath === item.fPath) {
      focusedStyle = {
        backgroundColor: "rgb(20 136 211)",
        color: "white !important",
      };
    }
    if (item.fPath === selectedNode?.fPath) {
      focusedStyle = {
        backgroundColor: "#0f6fac",
        color: "white !important",
      };
    }

    return (
      <List.Item
        key={item.fPath}
        onClick={() => {
          props.setActivePanel(props.panelType);
          const isFirst = state[0]?.index === item.index;
          const isLast = state[state.length - 1]?.index === item.index;
          EventBus.emit(EventTypes.REACT_WITH_CLICK, {
            ...selectedNode,
            isLast,
            isFirst,
          });
          setSelectedNode({ ...item });
        }}
        onContextMenu={() => {
          props.setActivePanel(props.panelType);
          const isFirst = state[0]?.index === item.index;
          const isLast = state[state.length - 1]?.index === item.index;
          EventBus.emit(EventTypes.REACT_WITH_CLICK, {
            ...selectedNode,
            isLast,
            isFirst,
          });
          setSelectedNode({ ...item });
        }}
        style={{ ...focusedStyle, ...itemListStyle }}
        onMouseEnter={() => {
          setSelectingNode({ ...item });
        }}
        onMouseLeave={() => {
          setSelectingNode(undefined);
        }}
      >
        <FieldNodeMolecules
          {...item}
          key={item.fPath}
          height={_.isNil(props.rowHeight) ? 0 : props.rowHeight}
          selected={(selectedNode || { fPath: "" }) as ILevelObject}
          isSelecting={
            item.fPath === selectedNode?.fPath ||
            selectingNode?.fPath === item.fPath
          }
          delete={() => onDelete(item)}
          onChange={(params: IEventPayload) => {
            const newState = state.map((item) => {
              // TODO: workaround to bypass useClickAway -> will find optimal solution later
              const selectIndex = _.isNil(selectedNode)
                ? selectingNode?.index
                : selectedNode?.index;

              if (item.index !== selectIndex) {
                return item;
              }

              return { ...item, ...params.update };
            });
            setState(newState);
          }}
          onFieldNameDoubleClick={() => {
            if (selectedNode) {
              onEditField(selectedNode);
            }
          }}
          onDefaultValueDoubleClick={() => {
            if (selectedNode) {
              onEditDefaultValue(selectedNode);
            }
          }}
          cancel={() => {
            if (selectedNode) {
              onCancelEditing(selectedNode);
            }
          }}
          confirm={(params: IEventPayload) => {
            if (selectedNode) {
              onConfirmEditing(params);
            }
          }}
        />
      </List.Item>
    );
  };
  return (
    <div
      id={"input-model-wrapper"}
      tabIndex={0} // Make div focusable
      role="menuitem"
      ref={containerRef}
      onFocus={() => props.setActivePanel(props.panelType)}
      onKeyUp={(e) => {
        if (editState.isEditing()) {
          return;
        }
        if (e.altKey && selectedNode && e.code === "Equal") {
          addNewNode(selectedNode, false);
          return;
        }
        if (e.altKey && selectedNode && e.code === "BracketRight") {
          e.preventDefault();
          addNewNode(selectedNode, true);
          return;
        }
        if (e.altKey && selectedNode && e.code === "Minus") {
          onDelete(selectedNode);
          return;
        }
        if (e.code === "ArrowDown" && selectedNode) {
          e.preventDefault();
          onArrowDown(selectedNode);
          return;
        }
        if (e.code === "ArrowUp" && selectedNode) {
          e.preventDefault();
          onArrowUp(selectedNode);
          return;
        }
        if (e.code === "ArrowLeft" && selectedNode) {
          e.preventDefault();
          onArrowLeft(selectedNode);
          return;
        }
        if (e.code === "ArrowRight" && selectedNode) {
          e.preventDefault();
          onArrowRight(selectedNode);
          return;
        }
        if (e.code === "KeyF" && selectedNode) {
          e.preventDefault();
          onEditField(selectedNode);
          return;
        }
        if (e.code === "KeyD" && selectedNode) {
          e.preventDefault();
          onEditDefaultValue(selectedNode);
          return;
        }
      }}
      style={{
        outline: "none",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        position: "relative",
      }} // Remove default focus outline
    >
      <List
        style={{
          width: "100%",
          height:
            props.height && props.height > 160 ? props.height - 80 : "100%",
          boxShadow: "0px 5px 5px 5px rgba(15, 111, 172, 0.4)",
          overflow: "scroll",
          // borderRight: '2px solid #0f6fac',
          borderTop: "5px solid #0f6fac",
        }}
        dataSource={state}
        renderItem={renderItem}
      />
    </div>
  );
};

export default SmartModelVisualizer;
