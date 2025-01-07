import { Button, Flex, List, Popover } from "antd";
import React from "react";
import { IPathSelectProps } from "../../../@types/components/atoms/IPathSelectProps";
import { usePathOptionsManager } from "../../../hooks/usePathMapper/usePathOptionsManager";
import FieldPathMolecule from "../../molecules/field-path";
import { IPathMapperData, SmartPathMapperProps } from "./types/StateTypes";

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
      style={{ display: "flex", flexDirection: "column", width: '20%' }}
    >
      <Flex
        style={{
          marginBottom: 10,
          border: '1px dashed blue',
          padding: 5,
          borderRadius: 5,
          background: 'aliceblue'
        }}>
        <Popover title={"This is the help"} trigger={"click"} showArrow placement="bottomLeft">
          <Button color="primary" variant="outlined" style={{ width: 100 }}>
            Wiki
          </Button>
        </Popover>
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
            >
              <FieldPathMolecule
                index={index}
                fromModel={{
                  ...fromPathModel,
                  events: {
                    onChange: (params) => {
                      console.log(params);
                    },
                    onSearch: () => { },
                  },
                }}
                toModel={{
                  ...toPathModel,
                  events: {
                    onChange: (params) => {
                      console.log(params);
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
