import { GetProps, Tree } from 'antd';
import { flatten } from 'flat';
import React from 'react';
import { IEventPayload } from '../../../@types/components/atoms/IEventPayload';
import { IInputModelTree } from '../../../@types/IInputModelTree';
import { useFieldChange } from '../../../hooks/useFieldChange';
import { useDirectFocus } from '../../../hooks/useFocusHandler/useDirectFocus';
import { useHeadFieldFocus } from '../../../hooks/useFocusHandler/useHeadFieldFocus';
import { useNextFieldFocus } from '../../../hooks/useFocusHandler/useNextFieldFocus';
import { useNextFocus } from '../../../hooks/useFocusHandler/useNextFocus';
import { usePrevFieldFocus } from '../../../hooks/useFocusHandler/usePrevFieldFocus';
import { useTrailFieldFocus } from '../../../hooks/useFocusHandler/useTrailFieldFocus';
import useFocusPath from '../../../hooks/useFocusPath';
import useInputConverter from '../../../hooks/useInputConverter';
import useInputDataManager from '../../../hooks/useInputDataManager';
import useJsonIndexer from '../../../hooks/useJsonIndexer';
import useModelProcessor from '../../../hooks/useModelProcessor';
import useTreeDataBuilder, { IInitEventReturn } from '../../../hooks/useTreeDataBuilder';
import { hotkeys } from './constants/HotKeyConfig';
import { IData } from './types/StateTypes';

interface InputModelOrganismProps {
    data: IData
}

type TreeProps = GetProps<typeof Tree>;


const InputModelOrganism: React.FC<InputModelOrganismProps> = (props) => {
    const [state, setState] = React.useState<IInputModelTree[]>([]);
    const inputDataManager = useInputDataManager();
    const modelProcessor = useModelProcessor();
    const inputConverter = useInputConverter();
    // Focused Field
    const focusField = useFocusPath();
    const jsonIndexer = useJsonIndexer();
    const nextFieldFocus = useNextFieldFocus({ focusField, inputConverter, inputDataManager, jsonIndexer, modelProcessor })
    const prevFieldFocus = usePrevFieldFocus({ focusField, inputConverter, inputDataManager, jsonIndexer, modelProcessor })
    const headFieldFocus = useHeadFieldFocus({ focusField, inputConverter, inputDataManager, jsonIndexer, modelProcessor })
    const trailFieldFocus = useTrailFieldFocus({ focusField, inputConverter, inputDataManager, jsonIndexer, modelProcessor })
    const fieldChange = useFieldChange({ focusField, inputConverter, inputDataManager, jsonIndexer, modelProcessor });
    const directFocus = useDirectFocus({ focusField, inputConverter, inputDataManager, jsonIndexer, modelProcessor });
    const nextFocus = useNextFocus({ focusField, inputConverter, inputDataManager, jsonIndexer, modelProcessor });

    const initEvents = (item: IInputModelTree): IInitEventReturn => {
        return {
            onChange: (params: IEventPayload) => {
                const treeData = fieldChange.process({ ...params, ...item })
                if (treeData) setState(treeData);
            },
            onBlur: (params: IEventPayload) => {
                const treeData = fieldChange.process({ ...params, ...item })
                if (treeData) setState(treeData);
                focusField.focus();
            },
            onDoubleClick: (params: IEventPayload) => {
                const treeData = fieldChange.process({ ...params, ...item })
                if (treeData) setState(treeData);
            },
            onPressEnter: (params: IEventPayload) => {
                const treeData = fieldChange.process({ ...params, ...item })
                if (!treeData) {
                    return;
                }
                setState(treeData)
                focusField.focus();
            },
            onClick: (params: IEventPayload) => {
                // Reset
                directFocus.process({ ...params, ...item });
                const treeData = fieldChange.process({ ...params, ...item })
                if (treeData) setState(treeData);
            },
            onArrowUp: (params: IEventPayload) => {
                if (prevFieldFocus.validate({ ...item, ...params })) {
                    const prevField = prevFieldFocus.findPrevField({ ...item, ...params })
                    const treeData = nextFocus.process(prevField);
                    setState(treeData);
                }
            },
            onArrowDown: (params: IEventPayload) => {
                if (nextFieldFocus.validate({ ...item, ...params })) {
                    const nextField = nextFieldFocus.findNextField({ ...item, ...params });
                    const treeData = nextFocus.process(nextField);
                    setState(treeData);
                }
            },
            onArrowLeft: (params: IEventPayload) => {
                if (headFieldFocus.validate({ ...item, ...params })) {
                    const headField = headFieldFocus.findHeadField({ ...item, ...params });
                    const treeData = nextFocus.process(headField);
                    setState(treeData);
                }
            },
            onArrowRight: (params: IEventPayload) => {
                if (trailFieldFocus.validate({ ...item, ...params })) {
                    const trailField = trailFieldFocus.findTrailField({ ...item, ...params });
                    const treeData = nextFocus.process(trailField);
                    setState(treeData);
                }
            },
        }
    }

    const treeDataBuilder = useTreeDataBuilder(initEvents, hotkeys);

    React.useEffect(() => {
        if (!props.data) {
            return;
        }
        inputConverter.setKeysRef([])
        jsonIndexer.reset()
        const indexedData = jsonIndexer.process(props.data);

        inputDataManager.set(flatten<IData, Record<string, any>>(indexedData))
        const treeData = inputConverter.convert(indexedData);
        setState(treeData);
    }, [])

    const onSelect: TreeProps['onSelect'] = (keys, info) => {
        console.log('Trigger Select', keys, info);
    };

    return (
        <div>
            <Tree
                style={{ background: 'rgb(0, 61, 99)' }}
                switcherIcon={null}
                onSelect={onSelect}
                selectable
                expandedKeys={inputConverter.getKeys()}
                defaultExpandedKeys={inputConverter.getKeys()}
                treeData={treeDataBuilder.build(state)}
            />
        </div>
    );
};

export default InputModelOrganism;