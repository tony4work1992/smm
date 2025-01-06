import React from "react";
import { IPathMapperData, SmartPathMapperProps } from "./types/StateTypes";
import { usePathOptionsManager } from "../../../hooks/usePathMapper/usePathOptionsManager";
import FieldPathMolecule from "../../molecules/field-path";
import { List } from "antd";
import { IPathSelectProps } from "../../../@types/components/atoms/IPathSelectProps";

// CSS Properties
const itemListStyle: React.CSSProperties = {
  height: 26,
  padding: "0px 0px",
  color: "#0f6fac",
  borderBottom: "1px dashed rgb(114 162 192)",
  fontWeight: "bold",
};

const SmartPathMapper: React.FC<SmartPathMapperProps> = (props) => {
  const [state, setState] = React.useState<IPathMapperData[]>();
  // Path Options Manager
  const pathOptionsManager = usePathOptionsManager();

  const fromPathOptions = React.useMemo(() => {
    pathOptionsManager.reset()
    return pathOptionsManager.build(props.fromModel);
  }, [props.fromModel]);

  const toPathOptions = React.useMemo(() => {
    pathOptionsManager.reset()
    return pathOptionsManager.build(props.toModel);
  }, [props.toModel]);

  React.useEffect(() => {
    if (!props.data) {
      return;
    }
    setState(props.data);
  }, [props.fromModel, props.toModel]);

  return (
    <div
      id={"smart-model-mapper"}
      role="menuitem"
      tabIndex={0}
      onKeyUp={(e) => {
        if (e.altKey && e.code === "Equal") {
          return;
        }
      }}
      style={{ marginLeft: 25, marginRight: 25 }}
    >
      <List
        style={{
          border: "2px solid #0f6fac",
          width: 500,
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
            >
              <FieldPathMolecule
                index={index}
                fromModel={{
                  ...fromPathModel,
                  events: {
                    onChange: (params) => {
                      // Insert logic here
                    },
                    onSearch: () => {},
                  },
                }}
                toModel={{
                  ...toPathModel,
                  events: {
                    onChange: (params) => {
                      // Insert logic here
                    },
                    onSearch: () => {},
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
