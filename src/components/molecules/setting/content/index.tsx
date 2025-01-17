import { Col, Flex, Row } from "antd";
import { ISettingContentProps } from "../../../../types/components/molecules/ISettingContentProps";
import LockSwitch from "../../../atoms/lock-switch";
import NumberInputAtom from "../../../atoms/input-number";

const SettingContentMolecule: React.FC<ISettingContentProps> = (props) => {
  return (
    <Flex gap="0px 0px" wrap={false} vertical>
      <Row
        justify="space-between"
        style={{
          height: 40,
          borderBottom: "1px dashed #0f6fac",
          borderTop: "1px dashed #0f6fac",
          paddingBottom: 5,
          paddingTop: 5,
        }}
      >
        {/** 1. Set Lock Width Panel */}
        <Col flex={2} style={{ marginRight: 20 }}>
          <span
            style={{ color: "#0f6fac", fontWeight: "bold", textWrap: "nowrap" }}
          >
            Lock Panel
          </span>
        </Col>
        <Col flex={1}>
          <LockSwitch {...props} />
        </Col>
      </Row>
      {/** 2. Set row's height */}
      <Row
        justify="space-between"
        style={{
          height: 40,
          borderBottom: "1px dashed #0f6fac",
          paddingBottom: 5,
          paddingTop: 5,
        }}
      >
        <Col flex={2} style={{ marginRight: 20 }}>
          <span
            style={{ color: "#0f6fac", fontWeight: "bold", textWrap: "nowrap" }}
          >
            Row Height
          </span>
        </Col>
        <Col flex={1}>
          <NumberInputAtom
            value={props.rowHeight}
            onNumberChange={props.onRowHeightChange}
          />
        </Col>
      </Row>
      {/** 3. Set width's panel */}
      <Row
        justify="space-between"
        style={{
          height: 40,
          borderBottom: "1px dashed #0f6fac",
          paddingBottom: 5,
          paddingTop: 5,
        }}
      >
        <Col flex={2} style={{ marginRight: 20 }}>
          <span
            style={{ color: "#0f6fac", fontWeight: "bold", textWrap: "nowrap" }}
          >
            Panel Width
          </span>
        </Col>
        <Col flex={1}>
          <NumberInputAtom
            value={props.panelWidth}
            onNumberChange={props.onPanelWidthchange}
          />
        </Col>
      </Row>
    </Flex>
  );
};

export default SettingContentMolecule;
