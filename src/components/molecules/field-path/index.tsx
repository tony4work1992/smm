import { Col, Flex, Row } from "antd";
import { IFieldPathMapperProps } from "../../../@types/components/molecules/IFieldPathMapperProps";
import LineNo from "../../atoms/line-no";
import PathSelectAtom from "../../atoms/path-select";

const FieldPathMolecule: React.FC<IFieldPathMapperProps> = (props) => {
  return (

    <Flex gap="0px 0px" wrap={false}>
      <LineNo {...props} />
      <span style={{ paddingRight: 5 }}></span>
      <Row justify="space-between">
        <Col span={10}>
          <PathSelectAtom {...props["fromModel"]} />
        </Col>
        <Col span={10}>
          <PathSelectAtom {...props["toModel"]} />
        </Col>
      </Row>
    </Flex>
  );
};

export default FieldPathMolecule;
