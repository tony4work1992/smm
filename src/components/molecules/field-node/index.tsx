import { Flex } from 'antd';
import { FieldNodeProps } from '../../../@types/components/molecules/IFieldNodeProps';
import useHotKeysClassifier from '../../../hooks/useHotKeysClassifier';
import { DataTypeAtom } from '../../atoms';
import DefaultValueEdit from '../../atoms/default-value/edit/DefaultValueEdit';
import DefaultValueView from '../../atoms/default-value/view/DefaultValueView';
import FieldNameEdit from '../../atoms/field-name/edit/FieldNameEdit';
import FieldNameView from '../../atoms/field-name/view/FieldNameView';


const FieldNodeMolecules: React.FC<FieldNodeProps> = (props) => {
    const hotkeys = useHotKeysClassifier(props.hotkeys);
    return (
        <Flex gap="0px 0px" wrap={false} onKeyDown={(e) => {
            const event = hotkeys.getEventByKey(e);
            if (event === null) {
                return;
            }
            if (event === 'onClick') {
                props.onClick({ update: { key: 'isFieldFocused', value: true } })
            }
            if (event === 'onDoubleClick') {
                props.onDoubleClick({ update: [{ key: 'isFieldEdit', value: true }] })
            }
            if (event === 'onArrowUp') {
                props.onArrowUp({ update: { key: 'isFieldFocused', value: true } })
            }
            if (event === 'onArrowDown') {
                props.onArrowDown({ update: { key: 'isFieldFocused', value: true } })
            }
            if (event === 'onArrowLeft') {
                props.onArrowLeft({ update: { key: 'isFieldFocused', value: true } })
            }
            if (event === 'onArrowRight') {
                props.onArrowRight({ update: { key: 'isFieldFocused', value: true } })
            }
        }}>
            <DataTypeAtom {...props} />
            {props.isFieldEdit && <FieldNameEdit {...props} />}
            {!props.isFieldEdit && <FieldNameView {...props} />}
            {props.isDefaultValueEdit && <DefaultValueEdit {...props} />}
            {!props.isDefaultValueEdit && <DefaultValueView {...props} />}
        </Flex>
    )
}

export default FieldNodeMolecules;