import { Tag } from 'antd';
import { FieldNameViewProps } from '../../../../@types/components/atoms/FieldNameProps';

const tagStyle: React.CSSProperties = {
    height: 25,
    marginInlineEnd: 0,
    verticalAlign: 'middle',
    borderTop: 0,
    borderBottom: 0,
    borderRight: 0,
    borderRadius: 0,
    borderLeft: 0,
    color: 'green',
    fontWeight: "bold",
    background: "white"
};

const FieldNameView: React.FC<FieldNameViewProps> = (props) => {
    return (
        <Tag style={tagStyle} defaultValue={props.fieldname} onDoubleClick={() => {
            props.onDoubleClick({ update: [{ key: 'isFieldEdit', value: true }] })
        }} >
            {props.fieldname}
        </Tag>
    )
}
export default FieldNameView