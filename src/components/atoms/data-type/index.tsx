import { AimOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps, Space, Tag } from 'antd';
import React from 'react';
import { IDataTypeProps } from '../../../@types/components/atoms/IDataTypeProps';


const tagTagStyle: React.CSSProperties = {
    height: 25,
    marginInlineEnd: 0,
    verticalAlign: 'middle',
    borderTop: 0,
    borderBottom: 0,
    borderRight: 0,
    borderRadius: 0,
    borderLeft: '3px solid green',
    color: 'green',
    fontWeight: "bold",
    background: "white"
};



const DataTypeAtom: React.FC<IDataTypeProps> = (props) => {
    const menus: MenuProps['items'] = React.useMemo(() => {
        return [{
            key: 'List',
            label: 'List',
            icon: <AimOutlined style={{ paddingTop: 2 }} />,
            extra: '⌘L',
            onClick: (e) => {
                props.onChange({ update: { key: 'datatype', value: e.key } })
            }
        },
        {
            key: 'Object',
            label: 'Object',
            icon: <AimOutlined style={{ paddingTop: 2 }} />,
            extra: '⌘S',
            onClick: (e) => {
                props.onChange({ update: { key: 'datatype', value: e.key } })
            }
        },
        {
            key: 'String',
            label: 'String',
            icon: <AimOutlined style={{ paddingTop: 2 }} />,
            extra: '⌘S',
            onClick: (e) => {
                props.onChange({ update: { key: 'datatype', value: e.key } })
            }
        },
        {
            key: 'Number',
            label: 'Number',
            icon: <AimOutlined style={{ paddingTop: 2 }} />,
            extra: '⌘S',
            onClick: (e) => {
                props.onChange({ update: { key: 'datatype', value: e.key } })
            }
        },
        {
            key: 'Boolean',
            label: 'Boolean',
            icon: <AimOutlined style={{ paddingTop: 2 }} />,
            extra: '⌘S',
            onClick: (e) => {
                props.onChange({ update: { key: 'datatype', value: e.key } })
            }
        },
        ];
    }, [props.datatype]);

    if (props.hide) {
        return <></>
    }

    return (
        <Tag style={tagTagStyle} key={`${props.datatype}_${props.fPath}`}>
            <Dropdown trigger={["click"]} menu={{ items: menus }} >
                <Space >
                    <AimOutlined style={{ paddingTop: 2 }} />
                    {props.datatype} {">>"}
                </Space>
            </Dropdown>
        </Tag>
    )
}
export default DataTypeAtom