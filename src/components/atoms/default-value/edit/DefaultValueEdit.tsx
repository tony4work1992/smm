import { Input } from 'antd';
import { DefaultValueEditProps } from '../../../../@types/components/atoms/IDefaultValueProps';
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
    color: 'green'
};

const DefaultValueEdit: React.FC<DefaultValueEditProps> = (props) => {
    const selfRef = useAutoFocus()
    
    return (
        <Input
            id={selfRef}
            style={{...tagInputStyle, width: `${props.defaultValue.length + 4}ch`}}
            defaultValue={props.defaultValue}
            onPressEnter={(e: React.KeyboardEvent<HTMLInputElement>) => {
                props.onPressEnter({
                    update: [
                        { key: 'defaultValue', value: e.currentTarget.value || '' },
                        { key: 'isDefaultValueEdit', value: false }
                    ]
                })
            }}
            onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                props.onBlur({
                    update: [
                        { key: 'defaultValue', value: e.currentTarget.value || '' },
                        { key: 'isDefaultValueEdit', value: false }
                    ]
                })
            }} />
    )
}

export default DefaultValueEdit;