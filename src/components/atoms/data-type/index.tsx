import { AimOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps, Space, Tag } from 'antd';
import React from 'react';
import { IDataTypeProps } from '../../../@types/components/atoms/IDataTypeProps';
import useFieldFocusHandler from '../hooks/useFieldFocusHandler';


const originalStyle: React.CSSProperties = {
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

    const fieldFocusHandler = useFieldFocusHandler()

    const styles = React.useMemo(() => ({ ...originalStyle, ...fieldFocusHandler.getFocusedStyles(!!props.isFieldFocused, originalStyle) }), [props.isFieldFocused])

    return (
        <Tag style={styles} key={`${props.datatype}_${props.fPath}`}
            onClick={() => {
                props.onClick({ update: { key: 'isFieldFocused', value: true } })
            }}
        >
            <Dropdown trigger={["contextMenu"]} menu={{ items: menus }} >
                <Space >
                    <AimOutlined style={{ paddingTop: 2 }} />
                    {props.datatype}
                </Space>
            </Dropdown>
        </Tag>
    )
}
export default DataTypeAtom