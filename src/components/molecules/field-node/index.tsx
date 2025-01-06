import { Flex } from "antd";
import { FieldNodeProps } from "../../../@types/components/molecules/IFieldNodeProps";
import { DataTypeAtom } from "../../atoms";
import DefaultValueEdit from "../../atoms/default-value/edit/DefaultValueEdit";
import DefaultValueView from "../../atoms/default-value/view/DefaultValueView";
import FieldNameEdit from "../../atoms/field-name/edit/FieldNameEdit";
import FieldNameView from "../../atoms/field-name/view/FieldNameView";
import IndentBlockAtom from "../../atoms/indent-block";
import ItemLevelAtom from "../../atoms/item-level";
import LineNo from "../../atoms/line-no";

const FieldNodeMolecules: React.FC<FieldNodeProps> = (props) => {
  return (
    <Flex gap="0px 0px" wrap={false}>
      <LineNo {...props} />
      <ItemLevelAtom {...props} />
      <IndentBlockAtom {...props} />
      <DataTypeAtom {...props} />
      {props.isFieldEdit && <FieldNameEdit {...props} />}
      {!props.isFieldEdit && <FieldNameView {...props} />}
      {props.isDefaultValueEdit && <DefaultValueEdit {...props} />}
      {!props.isDefaultValueEdit && <DefaultValueView {...props} />}
    </Flex>
  );
};

export default FieldNodeMolecules;
