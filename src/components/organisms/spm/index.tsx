import { List } from "antd";
import * as _ from "lodash";
import React from "react";
import { useClickAway } from "react-use";
import { PanelTypes } from "../../../@constants/panels/PanelTypes";
import { usePathOptionsManager } from "../../../hooks/usePathMapper/usePathOptionsManager";
import {
  IPathMapperData,
  IPathSelectProps,
  PathSelectStatus,
  SmartPathMapperProps,
} from "../../../types";
import FieldPathMolecule from "../../molecules/field-path";

// CSS Properties
const itemListStyle: React.CSSProperties = {
  height: 26,
  padding: "0px 0px",
  color: "#0f6fac",
  borderBottom: "1px dashed rgb(114 162 192)",
  fontWeight: "bold",
};

const SmartPathMapper: React.FC<SmartPathMapperProps> = (props) => {
  const [state, setState] = React.useState<IPathMapperData[]>([]);
  // Set field to be select
  const [selectingField, setSelectingField] = React.useState<IPathMapperData>();
  const [selectedField, setSelectedField] = React.useState<IPathMapperData>();
  // Path Options Manager
  const pathOptionsManager = usePathOptionsManager();
  const containerRef = React.useRef<HTMLDivElement>(null);

  useClickAway(containerRef, () => {
    if (!selectedField) {
      return;
    }
    props.setActivePanel(PanelTypes.NONE);
    setSelectedField(undefined);
  });

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
    const defaultField: IPathMapperData = {
      from: {
        fPath: "",
        status: PathSelectStatus.ERROR,
      },
      to: {
        fPath: "",
        status: PathSelectStatus.ERROR,
      },
    };

    // 1. Length <= 1 -> set to default data
    if (state.length <= 1) {
      setState([defaultField]);
      return;
    }

    // 2. Length > 1 -> remove the mapped path from list mapped paths
    const index = _.indexOf(state, params);

    if (index > -1) {
      const newState = state;
      state.splice(index, 1);
      setState(newState);
    }
  };

  const addNewPathMapping = () => {
    const emptyPaths = state.filter((item) => {
      if (item.from.status === PathSelectStatus.ERROR || item.to.status === PathSelectStatus.ERROR) {
        return item;
      }
    });

    if (emptyPaths.length > 0) {
      return;
    }

    const newState = [
      ...state,
      {
        from: { fPath: "", status: PathSelectStatus.ERROR },
        to: { fPath: "", status: PathSelectStatus.ERROR },
      },
    ];
    setState(newState);
  };

  /**
   * Logic when the path changed 
   * @param item IPathMapperData - path data mapped together from both model
   * @param fPath string - the value of the path changed
   * @param isFromModel boolean - check if the path source is from or to model
   * @returns 
   */
  const onPathChanged = (item: IPathMapperData, fPath: string, isFromModel: boolean) => {
    let newStatus = PathSelectStatus.OK;
    // If the field path is not selected yet
    if (_.isNil(fPath) || fPath === "") {
      newStatus = PathSelectStatus.ERROR
    }

    // If the field path is selected, check if duplicated or not
    const index = _.indexOf(state, item);
    const newState = [ ...state ];

    if (isFromModel) {
      const duplicatePaths = newState.filter((mappedPath) => {
        if (mappedPath.from.fPath === fPath) {
          return mappedPath;
        }
      })

      if (duplicatePaths.length > 0) {
        newStatus = PathSelectStatus.ERROR;
      }

      newState[index].from.fPath = fPath;
      newState[index].from.status = newStatus;
      setState(newState)
      addNewPathMapping();
      return;
    }

    const duplicatePaths = newState.filter((mappedPath) => {
      if (mappedPath.to.fPath === fPath) {
        return mappedPath;
      }
    })

    if (duplicatePaths.length > 0) {
      newStatus = PathSelectStatus.ERROR;
    }

    newState[index].to.fPath = fPath;
    newState[index].to.status = newStatus;
    setState(newState)
    addNewPathMapping();
  }

  return (
    <div
      ref={containerRef}
      id={"smart-model-mapper"}
      role="menuitem"
      tabIndex={0}
      onFocus={() => props.setActivePanel(props.panelType)}
      onKeyUp={(e) => {
        if (e.altKey && e.code === "Equal") {
          e.preventDefault();
          addNewPathMapping();
        }

        if (e.altKey && selectedField && e.code === "Minus") {
          e.preventDefault();
          onDelete(selectedField);
        }
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
        height: "100%",
      }}
    >
      <List
        style={{
          height:
            props.height && props.height > 160 ? props.height - 80 : "100%",
          marginLeft: "2%",
          marginRight: "2%",
          width: "96%",
          overflow: "scroll",
          // borderRight: '2px solid #0f6fac',
          boxShadow: "0px 5px 5px 5px rgba(15, 111, 172, 0.4)",
          borderTop: "5px solid #0f6fac",
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
                setSelectedField({ ...item });
              }}
              onBlur={() => {
                setSelectedField(undefined);
              }}
              onMouseEnter={() => {
                setSelectingField({ ...item });
              }}
              onMouseLeave={() => {
                setSelectingField(undefined);
              }}
            >
              <FieldPathMolecule
                index={index}
                isSelecting={
                  (item.from.fPath === selectingField?.from.fPath &&
                    item.to.fPath === selectingField?.to.fPath) ||
                  (item.from.fPath === selectedField?.from.fPath &&
                    item.to.fPath === selectedField?.to.fPath)
                }
                delete={() => {
                  onDelete(item);
                }}
                fromModel={{
                  ...fromPathModel,
                  events: {
                    onChange: (params) => {
                      onPathChanged(item, params.fPath, true);
                    },
                    onSearch: () => { },
                  },
                }}
                toModel={{
                  ...toPathModel,
                  events: {
                    onChange: (params) => {
                      onPathChanged(item, params.fPath, false);
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
