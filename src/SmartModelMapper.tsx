import { Flex, Splitter } from "antd";
import React from "react";
import { PanelTypes } from "./@constants/panels/PanelTypes";
import "./SmartModelMapper.css";
import SmartModelControl from "./components/organisms/smc";
import SmartModelVisualizer from "./components/organisms/smv";
import SmartPathMapper from "./components/organisms/spm";
import { IPathMapperData, SmartModelMapperProps } from "./types";
import { IInputModelTree } from "./types/IInputModelTree";
import { ISettingProps } from "./types/components/molecules/ISettingProps";

const SmartModelMapper: React.FC<SmartModelMapperProps> = (props) => {
  const [fromModel, setFromModel] = React.useState<IInputModelTree[]>([]);
  const [toModel, setToModel] = React.useState<IInputModelTree[]>([]);
  const [setting, setSetting] = React.useState<
    Pick<ISettingProps, "rowHeight" | "panelWidth" | "resizeable" | "isActive">
  >({
    resizeable: true,
    isActive: false,
    rowHeight: 26,
    panelWidth: 0,
  });

  const [activePanel, setActivePanel] = React.useState<PanelTypes>(
    PanelTypes.NONE,
  );
  let customStyle = {};
  if (props.wrapperBorder) {
    customStyle = { border: "2px solid #4848d3" };
  }
  const { width, marginLeft, marginRight } = props;
  if (width) {
    customStyle = { ...customStyle, width };
  }
  if (marginLeft) {
    customStyle = { ...customStyle, marginLeft };
  }
  if (marginRight) {
    customStyle = { ...customStyle, marginRight };
  }
  return (
    <Flex vertical style={{ padding: 10, borderRadius: 5, ...customStyle }}>
      <SmartModelControl
        setting={setting}
        activePanel={activePanel}
        onSettingChange={(params) => {
          const newSetting = { ...setting, ...params };
          setSetting(newSetting);
        }}
      />
      <Splitter
        layout="horizontal"
        style={{
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          height: "100%",
          width: setting.panelWidth === 0 ? "auto" : setting.panelWidth,
        }}
      >
        <Splitter.Panel resizable={setting.resizeable}>
          <SmartModelVisualizer
            data={props.from}
            panelType={PanelTypes.SOURCE_MODEL}
            height={props.height}
            rowHeight={setting.rowHeight}
            setActivePanel={setActivePanel}
            onModelChange={(params) => {
              setFromModel(params.data);
            }}
          />
        </Splitter.Panel>
        <Splitter.Panel resizable={setting.resizeable}>
          <SmartPathMapper
            data={props.mapping}
            fromModel={fromModel}
            toModel={toModel}
            height={props.height}
            panelType={PanelTypes.PATH_MAPPER}
            setActivePanel={setActivePanel}
            onPathUpdate={(data: IPathMapperData[]) => {
              console.log(data);
              // Insert logic here
              throw new Error("Function not implemented.");
            }}
          />
        </Splitter.Panel>
        <Splitter.Panel resizable={setting.resizeable}>
          <SmartModelVisualizer
            data={props.to}
            panelType={PanelTypes.DESTINATION_MODEL}
            height={props.height}
            rowHeight={setting.rowHeight}
            setActivePanel={setActivePanel}
            onModelChange={(params) => {
              setToModel(params.data);
            }}
          />
        </Splitter.Panel>
      </Splitter>
    </Flex>
  );
};

export default SmartModelMapper;
