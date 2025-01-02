import { FormOutlined } from '@ant-design/icons';
import { Input, Tag } from 'antd';
import React from 'react';
import { FieldNameViewProps } from '../../../../@types/components/atoms/FieldNameProps';

const originalStyle: React.CSSProperties = {
    height: 25,
    marginInlineEnd: 0,
    verticalAlign: 'middle',
    borderTop: 0,
    borderBottom: 0,
    borderRight: 0,
    borderRadius: 0,
    borderLeft: 0,
    // color: 'white',
    fontStyle: "italic",
    background: 'rgba(255, 255, 255, 0)',
    paddingRight: 2,
    paddingLeft: 5,
    transition: "color 0.25s ease-out, background 0.25s ease-out"
};

const FieldNameView: React.FC<FieldNameViewProps> = (props) => {

    return (
        <Tag
            style={originalStyle} defaultValue={props.fieldname}
            onDoubleClick={() => {
                props.onDoubleClick({ update: [{ key: 'isFieldEdit', value: true }] })
            }}
        >
            <FormOutlined style={{ ...originalStyle, paddingRight: 2 }} />
            <Input id={`${props.fPath}_input`} readOnly value={props.fieldname} style={{ ...originalStyle, width: `${props.fieldname.length + 2}ch` }} />
        </Tag>
    )
}
export default FieldNameView