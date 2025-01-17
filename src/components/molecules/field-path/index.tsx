import { Col, Row } from "antd";
import { IFieldPathMapperProps } from "../../../types/components/molecules/IFieldPathMapperProps";
import DeleteButton from "../../atoms/delete-button";
import LineNo from "../../atoms/line-no";
import PathSelectAtom from "../../atoms/path-select";

const FieldPathMolecule: React.FC<IFieldPathMapperProps> = (props) => {
  return (
    // <Flex gap="0px 0px" wrap={false} style={{ width: "100%", position: "relative" }}>
    <Row
      justify="space-between"
      style={{ width: "100%", position: "relative" }}
    >
      <Col span={2} style={{ height: 25 }}>
        <LineNo {...props} />
      </Col>
      <Col span={9}>
        <PathSelectAtom {...props["fromModel"]} />
      </Col>
      <Col span={9}>
        <PathSelectAtom {...props["toModel"]} />
      </Col>
      {props.isSelecting && (
        <Col span={2}>
          <DeleteButton delete={props.delete} />
        </Col>
      )}
    </Row>

    // </Flex>
  );
};

export default FieldPathMolecule;
