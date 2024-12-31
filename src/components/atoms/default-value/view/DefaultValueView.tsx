import { Tag } from 'antd';
import { DefaultValueViewProps } from '../../../../@types/components/atoms/IDefaultValueProps';
import useFieldFocusHandler from '../../hooks/useFieldFocusHandler';
import React from 'react';
import { EditOutlined } from '@ant-design/icons';
import useHotKeysClassifier from '../../../../hooks/useHotKeysClassifier';

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
    paddingLeft: 0
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
                if(event === 'onClick') {
                    props.onClick({ update: { key: 'isFieldFocused', value: true } })
                }
                if(event === 'onDoubleClick') {
                    props.onDoubleClick({ update: [{ key: 'isFieldEdit', value: true }] })
                }
            }}  >
                <EditOutlined style={ {...styles, paddingRight: 4} } />
            {props.defaultValue}
        </Tag>
    )
}
export default DefaultValueView