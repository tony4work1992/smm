import { Flex, Input } from 'antd';
import { FieldNodeProps } from '../../../@types/components/molecules/IFieldNodeProps';
import { DataTypeAtom } from '../../atoms';
import FieldNameEdit from '../../atoms/field-name/edit/FieldNameEdit';
import FieldNameView from '../../atoms/field-name/view/FieldNameView';

const tagInputDefaultStyle: React.CSSProperties = {
    paddingLeft: 0,
    width: 50,
    height: 25,
    marginInlineStart: 5,
    verticalAlign: 'middle',
    borderTop: 0,
    borderLeft: 0,
    borderRight: 0,
    borderBottom: '0px solid green',
    borderRadius: 0,
    background: "white",
    color: 'green'
};

const FieldNodeMolecules: React.FC<FieldNodeProps> = (props) => {
    return (
        <Flex gap="0px 0px" wrap={false}>
            <DataTypeAtom {...props} />
            {props.isFieldEdit && <FieldNameEdit {...props} />}
            {!props.isFieldEdit && <FieldNameView {...props} />}
            <Input style={tagInputDefaultStyle} defaultValue={props.defaultValue} />
        </Flex>
    )
}

export default FieldNodeMolecules;