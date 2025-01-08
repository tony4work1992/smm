import { Flex, Splitter } from "antd";
import React from "react";
import { PanelTypes } from './@constants/panels/PanelTypes';
import "./SmartModelMapper.css";
import SmartModelControl from './components/organisms/smc';
import SmartModelVisualizer from "./components/organisms/smv";
import SmartPathMapper from "./components/organisms/spm";
import { IPathMapperData, SmartModelMapperProps } from './types';
import { IInputModelTree } from "./types/IInputModelTree";

const SmartModelMapper: React.FC<SmartModelMapperProps> = (props) => {
  const [fromModel, setFromModel] = React.useState<IInputModelTree[]>([]);
  const [toModel, setToModel] = React.useState<IInputModelTree[]>([]);

  const [activePanel, setActivePanel] = React.useState<PanelTypes>(PanelTypes.NONE)

  return (
    <Flex vertical style={{ padding: 10, border: '2px solid #4848d3', borderRadius: 5, height: 900 }}>
      <SmartModelControl activePanel={activePanel} />
      <Splitter layout='horizontal' style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', height: '100%' }}>
        <Splitter.Panel>
          <SmartModelVisualizer
            data={props.from}
            panelType={PanelTypes.SOURCE_MODEL}
            setActivePanel={setActivePanel}
            onModelChange={(params) => {
              setFromModel(params.data);
            }}
          />
        </Splitter.Panel>
        <Splitter.Panel>
          <SmartPathMapper
            data={props.mapping}
            fromModel={fromModel}
            toModel={toModel}
            panelType={PanelTypes.PATH_MAPPER}
            setActivePanel={setActivePanel}
            onPathUpdate={(data: IPathMapperData[]) => {
              console.log(data)
              // Insert logic here
              throw new Error("Function not implemented.");
            }}
          />
        </Splitter.Panel>
        <Splitter.Panel>
          <SmartModelVisualizer
            data={props.to}
            panelType={PanelTypes.DESTINATION_MODEL}
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



