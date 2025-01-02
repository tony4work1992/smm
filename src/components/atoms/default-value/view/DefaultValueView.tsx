import { EditOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import React from 'react';
import { DefaultValueViewProps } from '../../../../@types/components/atoms/IDefaultValueProps';

const originalStyle: React.CSSProperties = {
    height: 25,
    marginInlineEnd: 0,
    verticalAlign: 'middle',
    borderTop: 0,
    borderBottom: 0,
    borderRight: 0,
    borderRadius: 0,
    borderLeft: 0,
    // color: ThemeStyles.TEXT_COLOR_LEVEL_1,
    background: 'rgba(255, 255, 255, 0)',
    paddingLeft: 0,
    transition: "color 0.25s ease-out, background 0.25s ease-out"
};

const DefaultValueView: React.FC<DefaultValueViewProps> = (props) => {

    return (
        <Tag style={originalStyle} defaultValue={props.defaultValue}
            onDoubleClick={() => {
                props.onDoubleClick({ update: [{ key: 'isDefaultValueEdit', value: true }] })
            }}
        >
            <EditOutlined style={{ ...originalStyle, paddingRight: 4 }} />
            {props.defaultValue}
        </Tag>
    )
}
export default DefaultValueView