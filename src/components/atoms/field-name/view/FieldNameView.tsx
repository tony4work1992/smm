import { FormOutlined } from '@ant-design/icons';
import { Input, Tag } from 'antd';
import React from 'react';
import { FieldNameViewProps } from '../../../../@types/components/atoms/FieldNameProps';
import useFieldFocusHandler from '../../hooks/useFieldFocusHandler';

const originalStyle: React.CSSProperties = {
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
    background: "white",
    paddingRight: 2,
    paddingLeft: 5
};

const FieldNameView: React.FC<FieldNameViewProps> = (props) => {
    const fieldFocusHandler = useFieldFocusHandler()

    const styles = React.useMemo(() => ({ ...originalStyle, ...fieldFocusHandler.getFocusedStyles(!!props.isFieldFocused, originalStyle) }), [props.isFieldFocused])
    return (
        <Tag
            style={styles} defaultValue={props.fieldname}
            onClick={() => {
                props.onClick({ update: { key: 'isFieldFocused', value: true } })
            }}
            onDoubleClick={() => {
                props.onDoubleClick({ update: [{ key: 'isFieldEdit', value: true }] })
            }}
        >
            <FormOutlined style={{ ...styles, paddingRight: 2 }} />
            <Input id={`${props.fPath}_input`} readOnly value={props.fieldname} style={{ ...styles, width: `${props.fieldname.length + 2}ch` }} />
        </Tag>
    )
}
export default FieldNameView