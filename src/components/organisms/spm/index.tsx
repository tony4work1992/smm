import { PlusOutlined } from "@ant-design/icons";
import { Button, Flex, List, Popover } from "antd";
import * as _ from 'lodash';
import React from "react";
import { usePathOptionsManager } from "../../../hooks/usePathMapper/usePathOptionsManager";
import { IPathMapperData, IPathSelectProps, SmartPathMapperProps } from "../../../types";
import FieldPathMolecule from "../../molecules/field-path";

// CSS Properties
const itemListStyle: React.CSSProperties = {
  height: 26,
  padding: "0px 0px",
  color: "#0f6fac",
  borderBottom: "1px dashed rgb(114 162 192)",
  fontWeight: "bold",
};

const defaultData: IPathMapperData = {
  from: {
    fPath: ""
  },
  to: {
    fPath: ""
  }
}

const SmartPathMapper: React.FC<SmartPathMapperProps> = (props) => {
  const [state, setState] = React.useState<IPathMapperData[]>([]);
  // Set field to be select
  const [selectingField, setSelectingField] = React.useState<IPathMapperData>();
  const [selectedField, setSelectedField] = React.useState<IPathMapperData>();
  // Path Options Manager
  const pathOptionsManager = usePathOptionsManager();

  const fromPathOptions = React.useMemo(() => {
    return pathOptionsManager.build(props.fromModel);
  }, [JSON.stringify(props.fromModel)]);

  const toPathOptions = React.useMemo(() => {
    return pathOptionsManager.build(props.toModel);
  }, [JSON.stringify(props.toModel)]);

  React.useEffect(() => {
    if (!props.data) {
      return;
    }
    setState(props.data);
  }, [JSON.stringify(props.fromModel), JSON.stringify(props.toModel)]);

  const onDelete = (params: IPathMapperData) => {
    // 1. Length <= 1 -> set to default data
    if (state.length <= 1) {
      setState([defaultData]);
      return;
    }

    // 2. Length > 1 -> remove the mapped path from list mapped paths
    const index = _.indexOf(state, params);

    if (index > -1) {
      const newState = state;
      state.splice(index, 1);
      setState(newState)
    }
  }

  return (
    <div
      id={"smart-model-mapper"}
      role="menuitem"
      tabIndex={0}
      onKeyUp={(e) => {
        if (e.altKey && e.code === "Equal") {
          const newState = [...state, defaultData];
          setState(newState)
        }
      }}
      style={{ display: "flex", flexDirection: "column", width: '20%' }}
    >
      <Flex
        justify="space-between"
        style={{
          marginBottom: 10,
          border: "1px dashed blue",
          padding: 5,
          borderRadius: 5,
          background: "aliceblue",
        }}
      >
        <Popover
          title={"This is the help"}
          trigger={"click"}
          showArrow
          placement="bottomLeft"
        >
          <Button color="primary" variant="outlined" style={{ width: 100 }}>
            Wiki
          </Button>
        </Popover>
        <Button
          color="primary"
          variant="outlined"
          shape="circle"
          icon={<PlusOutlined />}
          onClick={() => {
            const newState = [...state, defaultData];
            setState(newState)
          }}
        >
        </Button>
      </Flex>
      <List
        style={{
          border: "2px solid #0f6fac",
          height: 1000,
          overflow: "scroll",
        }}
        dataSource={state}
        renderItem={(item, index) => {
          const fromPathModel: Omit<IPathSelectProps, "events"> = {
            options: fromPathOptions,
            ...item.from,
          };
          const toPathModel: Omit<IPathSelectProps, "events"> = {
            options: toPathOptions,
            ...item.to,
          };
          return (
            <List.Item
              style={itemListStyle}
              key={`${item.from.fPath}${item.to.fPath}`}
              onClick={() => {
                setSelectedField({ ...item })
              }}
              onBlur={() => {
                setSelectedField(undefined)
              }}
              onMouseEnter={() => {
                setSelectingField({ ...item })
              }}
              onMouseLeave={() => {
                setSelectingField(undefined)
              }}
            >
              <FieldPathMolecule
                index={index}
                isSelecting={
                  (item.from.fPath === selectingField?.from.fPath && item.to.fPath === selectingField?.to.fPath) ||
                  (item.from.fPath === selectedField?.from.fPath && item.to.fPath === selectedField?.to.fPath)
                }
                delete={() => { onDelete(item) }}
                fromModel={{
                  ...fromPathModel,
                  events: {
                    onChange: (params) => {
                      const newState = state.map(mappedPath => {
                        if (item.from.fPath === mappedPath.from.fPath) {
                          mappedPath.from.fPath = params.fPath;
                        }

                        return mappedPath;
                      })
                      console.log('newState', newState)
                      setState(newState);
                    },
                    onSearch: () => { },
                  },
                }}
                toModel={{
                  ...toPathModel,
                  events: {
                    onChange: (params) => {
                      const newState = state.map(mappedPath => {
                        if (item.to.fPath === mappedPath.to.fPath) {
                          mappedPath.to.fPath = params.fPath;
                        }

                        return mappedPath;
                      })

                      setState(newState);
                    },
                    onSearch: () => { },
                  },
                }}
              />
            </List.Item>
          );
        }}
      />
    </div>
  );
};

export default SmartPathMapper;
