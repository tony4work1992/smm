import { Tag } from 'antd';
import { DefaultValueViewProps } from '../../../../@types/components/atoms/IDefaultValueProps';

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

const DefaultValueView: React.FC<DefaultValueViewProps> = (props) => {
    return (
        <Tag style={tagStyle} defaultValue={props.defaultValue}
        onClick={() => {console.log('>>>>>>>>>>>>>>>>>>')}}
        onDoubleClick={() => {
            props.onDoubleClick({ update: [{ key: 'isDefaultValueEdit', value: true }] })
        }} >
            {props.defaultValue}
        </Tag>
    )
}
export default DefaultValueView