import { Input } from 'antd';
import React from 'react';
import { FieldNameEditProps } from '../../../../@types/components/atoms/FieldNameProps';
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
    // color: 'green'
};

const FieldNameEdit: React.FC<FieldNameEditProps> = (props) => {
    const selfRef = useAutoFocus()

    return (
        <Input
            id={selfRef}
            style={{ ...tagInputStyle, width: `${props.fieldname.length + 4}ch` }}
            defaultValue={props.fieldname}
            onPressEnter={(e: React.KeyboardEvent<HTMLInputElement>) => {
                props.confirm({
                    update: [
                        { key: 'fieldname', value: e.currentTarget.value || '' },
                        { key: 'isFieldEdit', value: false }

                    ]
                })
            }}
            onKeyUp={(e) => {
                if (e.code === 'Escape') {
                    e.preventDefault()
                    props.cancel({
                        update: [
                            { key: 'defaultValue', value: props.fieldname || '' },
                            { key: 'isDefaultValueEdit', value: false }
                        ]
                    })
                }
            }}
            onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                props.confirm({
                    update: [
                        { key: 'fieldname', value: e.currentTarget.value || '' },
                        { key: 'isFieldEdit', value: false }

                    ]
                })
            }} />
    )
}

export default FieldNameEdit;