import { FieldOnChangeParams } from '../../../../@types/components/atoms/IDataTypeProps';
import { IInputModelTree } from '../../../../@types/IInputModelTree';
import FieldNodeMolecules from '../../../molecules/field-node';

const useTreeDataBuilder = (onFieldChange: (params: FieldOnChangeParams) => void) => {
    const build = (treeData: IInputModelTree[]): IInputModelTree[] => {
        return treeData.map((item) => {
            return {
                ...item,
                key: `${item.fPath}`, // Key of the node
                title: (
                    <FieldNodeMolecules
                        onChange={(params) => {
                            onFieldChange({ ...params, ...item })
                        }}
                        onBlur={(params) => {
                            onFieldChange({ ...params, ...item })
                        }}
                        onDoubleClick={(params) => {
                            onFieldChange({ ...params, ...item })
                        }}
                        onPressEnter={(params) => {
                            onFieldChange({ ...params, ...item })
                        }}
                        isFieldEdit={item.isFieldEdit}
                        fPath={`${item.fPath}`}
                        fieldname={item.fieldname}
                        datatype={item.datatype}
                        defaultValue={item.defaultValue}
                        key={item.fPath} />
                ),
                children: build(item.children || []), // Recursive call for children
            }
        });
    }

    return {
        build
    }
}

export default useTreeDataBuilder;