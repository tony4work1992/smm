import { Input } from 'antd';
import { FieldNameEditProps } from '../../../../@types/components/atoms/FieldNameProps';
import React from 'react';
import useAutoFocus from '../../../../hooks/useAutoFocus';

const tagInputStyle: React.CSSProperties = {
    paddingLeft: 0,
    paddingTop: 2,
    minWidth: 20,
    width: "10ch",
    height: 25,
    marginInlineStart: 5,
    verticalAlign: 'middle',
    border: '1px dashed green',
    borderRadius: 0,
    // background: "rgb(153 245 153)",
    color: 'green'
};

const FieldNameEdit: React.FC<FieldNameEditProps> = (props) => {
    const selfRef = useAutoFocus()

    return (
        <Input
            id={selfRef}
            style={{...tagInputStyle, width: `${props.fieldname.length + 4}ch`}}
            defaultValue={props.fieldname}
            onPressEnter={(e: React.KeyboardEvent<HTMLInputElement>) => {
                props.onPressEnter({
                    update: [
                        { key: 'fieldname', value: e.currentTarget.value || '' },
                        { key: 'isFieldEdit', value: false }

                    ]
                })
            }}
            onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                props.onBlur({
                    update: [
                        { key: 'fieldname', value: e.currentTarget.value || '' },
                        { key: 'isFieldEdit', value: false }

                    ]
                })
            }} />
    )
}

export default FieldNameEdit;