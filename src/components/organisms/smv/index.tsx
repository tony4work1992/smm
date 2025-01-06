import { Button, Flex, List, Popover, Radio } from "antd";
import { flatten } from "flat";
import { cloneDeep } from "lodash";
import React from "react";
import { useClickAway } from 'react-use';
import { IEventPayload } from "../../../@types/components/atoms/IEventPayload";
import { IInputModelTree } from "../../../@types/IInputModelTree";
import { ILevelObject } from "../../../hooks/types";
import { useEditState } from "../../../hooks/useEditState";
import useFocusHelper from "../../../hooks/useFocusHelper";
import useInputDataManager from "../../../hooks/useInputDataManager";
import { useLevelManager } from "../../../hooks/useLevelManager";
import FieldNodeMolecules from "../../molecules/field-node";
import { IData } from "./types/StateTypes";

interface SmartModelVisualizerProps {
  data: IData;
  onModelChange?: (params: {
    item: IInputModelTree;
    data: IInputModelTree[];
  }) => void;
}

const itemListStyle = {
  height: 26,
  padding: "0px 0px",
  color: "#0f6fac",
  borderBottom: "1px dashed rgb(114 162 192)",
  fontWeight: "bold",
};

const SmartModelVisualizer: React.FC<SmartModelVisualizerProps> = (props) => {
  const [state, setState] = React.useState<IInputModelTree[]>([]);
  const inputDataManager = useInputDataManager();
  // Focused Field
  const focusField = useFocusHelper("input-model-wrapper");
  const editState = useEditState();
  const levelManager = useLevelManager();
  const [selectedNode, setSelectedNode] = React.useState<IInputModelTree>();
  const [selectingNode, setSelectingNode] = React.useState<IInputModelTree>();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [modelType, setModelType] = React.useState<'document' | 'table'>('document');

  useClickAway(containerRef, () => {
    setSelectedNode(undefined)
  })

  const onArrowUp = (params: IInputModelTree) => {
    const nextItem = state.find((item) => item.index === params.index - 1);
    if (nextItem) {
      setSelectedNode(nextItem);
    }
  };

  const onArrowDown = (params: IInputModelTree) => {
    const nextItem = state.find((item) => item.index === params.index + 1);
    if (nextItem) {
      setSelectedNode(nextItem);
    }
  };

  const onArrowLeft = (_: IInputModelTree) => {
    const nextItem = cloneDeep(state).shift();
    if (nextItem) {
      setSelectedNode(nextItem);
    }
  };

  const onArrowRight = (_: IInputModelTree) => {
    const nextItem = cloneDeep(state).pop();
    if (nextItem) {
      setSelectedNode(nextItem);
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
  const onNextNewNode = (params: IInputModelTree) => {
    // From the top to the current selected item.
    const head = state.filter((item) => item.index <= params.index);
    // the children of the selected node.
    const middle = state.filter(
      (item) =>
        item.fPath !== params.fPath && item.fPath.startsWith(params.fPath),
    );
    const post = head.concat(middle);
    console.log(head.concat(middle).map((item) => item.fPath));

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
      level: params.level,
      fPath: params.fPath
        .slice(0, params.fPath.lastIndexOf("."))
        .concat(`.${fieldname}`),
      datatype: params.datatype,
      defaultValue: `defaultValue${randomKey1}_${randomKey2}`,
      fieldname,
      index: post.length,
    };
    const newState = post.concat([newNode]).concat(tail);
    setState(newState);
    onModelChange({ item: selectedNode, data: newState });
  };

  const onDelete = (params: IInputModelTree) => {
    if (state.length <= 1) {
      return;
    }
    const newState = state.filter((item) => {
      const isDeleteItem = item.index === params.index;
      const isChild = item.fPath !== params.fPath && item.fPath.startsWith(params.fPath);
      return !isChild && !isDeleteItem
    }).map((item, index) => ({ ...item, index }))
    const prevNode = newState.find((item) => item.index === (params.index - 1));
    if (prevNode) {
      setState(newState);
      /** @NOTE React Batch update mechanism is not working properly, so setTimeout here intentionally */
      setTimeout(() => {
        setSelectedNode({ ...prevNode })
        onModelChange({ item: prevNode, data: newState });
      }, 100)
      return;
    }

  }

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

  const renderItem = (item: IInputModelTree) => {
    let focusedStyle: React.CSSProperties = {};
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
          setSelectedNode({ ...item });
        }}
        onContextMenu={() => {
          setSelectedNode({ ...item });
        }}
        style={{ ...focusedStyle, ...itemListStyle }}
        onMouseEnter={() => {
          setSelectingNode({ ...item })
        }}
        onMouseLeave={() => {
          setSelectingNode(undefined)
        }}
      >
        <FieldNodeMolecules
          {...item}
          key={item.fPath}
          selected={(selectedNode || { fPath: "" }) as ILevelObject}
          isSelecting={item.fPath === selectedNode?.fPath || selectingNode?.fPath === item.fPath}
          delete={() => onDelete(item)}
          onChange={(params: IEventPayload) => {
            const newState = state.map((item) => {
              if (item.index !== selectedNode?.index) {
                return item;
              }
              return { ...item, ...params.update };
            });
            setState(newState);
          }}
          onDoubleClick={(params: IEventPayload) => {
            const newState = state.map((item) => {
              if (item.index !== selectedNode?.index) {
                return item;
              }
              return { ...item, ...params.update };
            });
            editState.enableEditMode();
            setState(newState);
          }}
          cancel={(params: IEventPayload) => {
            const newState = state.map((item) => {
              if (item.index !== selectedNode?.index) {
                return item;
              }
              return { ...item, ...params.update };
            });
            editState.disableEditMode();
            setState(newState);
            focusField.focus();
          }}
          confirm={(params: IEventPayload) => {
            const newState = state.map((item) => {
              if (item.index !== selectedNode?.index) {
                return item;
              }
              return { ...item, ...params.update };
            });
            setState(newState);
            editState.disableEditMode();
            focusField.focus();

            onModelChange({ item: selectedNode, data: newState });
          }}
        />
      </List.Item>
    );
  }
  return (
    <div
      id={"input-model-wrapper"}
      tabIndex={0} // Make div focusable
      role="menuitem"
      ref={containerRef}
      onKeyUp={(e) => {
        if (editState.isEditing()) {
          return;
        }
        if (e.altKey && selectedNode && e.code === "Equal") {
          onNextNewNode(selectedNode);
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
          editState.enableEditMode();
          const newState = state.map((item) => {
            if (item.index === selectedNode.index) {
              return { ...item, isFieldEdit: true };
            }
            return item;
          });
          setState(newState);
          onModelChange({ item: selectedNode, data: newState });
          return;
        }
        if (e.code === "KeyD" && selectedNode) {
          /** @NOTE If data type is object, then do not allow to modify default value. */
          if (selectedNode.datatype === 'Object') {
            return;
          }
          e.preventDefault();
          editState.enableEditMode();
          const newState = state.map((item) => {
            if (item.index === selectedNode.index) {
              return { ...item, isDefaultValueEdit: true };
            }
            return item;
          });
          setState(newState);
        }
      }}
      style={{ outline: "none", display: "flex", flexDirection: "column", width: '40%' }} // Remove default focus outline
    >
      <Flex gap={10} align='center'
        style={{
          marginBottom: 10,
          border: '1px dashed blue',
          padding: 5,
          borderRadius: 5,
          background: 'aliceblue'

        }}>
        <Popover
          title={
            <>
              <p>(Alt + =) : Add a new field at the level of selecting field.</p>
              <p>(Alt + -): Delete the current field.</p>
              <p>(Alt + F): Edit field name the current field.</p>
              <p>(Alt + D): Edit default value the current field.</p>
              <p>@Note: Field with datatype object can't edit default value </p>
            </>
          } trigger={"click"} showArrow placement="bottomLeft">
          <Button color="primary" variant="dashed" style={{ width: 100 }}>
            Wiki
          </Button>

        </Popover>
        <Radio.Group
          onChange={(e) => {
            setModelType(e.target.value)
          }}
          value={modelType}
          buttonStyle="solid"
        >
          <Radio.Button value={'document'}>Document</Radio.Button>
          <Radio.Button value={'table'}>Table</Radio.Button>
        </Radio.Group>
      </Flex>
      <List
        style={{
          border: "2px solid #0f6fac",
          width: '100%',
          height: 1000,
          overflow: "scroll",
        }}
        dataSource={state}
        renderItem={renderItem}
      />
    </div >
  );
};

export default SmartModelVisualizer;
