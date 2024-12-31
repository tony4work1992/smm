import { EditOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import React from 'react';
import { DefaultValueViewProps } from '../../../../@types/components/atoms/IDefaultValueProps';
import useHotKeysClassifier from '../../../../hooks/useHotKeysClassifier';
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
    color: 'whitesmoke',
    background: 'rgba(255, 255, 255, 0)',
    paddingLeft: 0,
    transition: "color 0.25s ease-out, background 0.25s ease-out"
};

const DefaultValueView: React.FC<DefaultValueViewProps> = (props) => {
    const fieldFocusHandler = useFieldFocusHandler()
    const styles = React.useMemo(() => ({ ...originalStyle, ...fieldFocusHandler.getFocusedStyles(!!props.isFieldFocused, originalStyle) }), [props.isFieldFocused])
    const hotkeys = useHotKeysClassifier(props.hotkeys);
    return (
        <Tag style={styles} defaultValue={props.defaultValue}
            onClick={() => {
                props.onClick({ update: { key: 'isFieldFocused', value: true } })
            }}
            onDoubleClick={() => {
                props.onDoubleClick({ update: [{ key: 'isDefaultValueEdit', value: true }] })
            }}
            onKeyDown={(e) => {
                const event = hotkeys.getEventByKey(e);
                if (event === 'onClick') {
                    props.onClick({ update: { key: 'isFieldFocused', value: true } })
                }
                if (event === 'onDoubleClick') {
                    props.onDoubleClick({ update: [{ key: 'isFieldEdit', value: true }] })
                }
            }}  >
            <EditOutlined style={{ ...styles, paddingRight: 4 }} />
            {props.defaultValue}
        </Tag>
    )
}
export default DefaultValueView