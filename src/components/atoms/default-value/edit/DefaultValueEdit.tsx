import { Input } from 'antd';
import { DefaultValueEditProps } from '../../../../@types/components/atoms/IDefaultValueProps';

const tagInputStyle: React.CSSProperties = {
    paddingLeft: 0,
    paddingTop: 2,
    minWidth: 20,
    width: "10ch",
    height: 25,
    marginInlineStart: 5,
    verticalAlign: 'middle',
    borderTop: 0,
    borderLeft: 0,
    borderRight: 0,
    borderBottom: '0px solid green',
    borderRadius: 0,
    // background: "rgb(153 245 153)",
    color: 'green'
};

const DefaultValueEdit: React.FC<DefaultValueEditProps> = (props) => {
    return (
        <Input
            style={tagInputStyle}
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