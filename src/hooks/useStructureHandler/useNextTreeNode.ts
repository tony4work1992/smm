import { IInputModelTree } from "../../@types/IInputModelTree";
import { IData } from "../../components/organisms/input-model/types/StateTypes";
import * as _ from 'lodash';

export const useNextTreeNode = (params: IData) => {

    const add = (item: Pick<IInputModelTree, 'fieldname' | 'fPath'>) => {
        console.time('hehe')
        // Create a new tree node path
        const fieldName = new RegExp(String.raw`${item.fieldname}$`)
        let newNodePath = _.replace(_.replace(item.fPath, /\./g, '.fields.'), fieldName, 'default0');
        
        // Check if path is exists or not
        let index = 1;
        while (_.hasIn(params, newNodePath)) {
            newNodePath = newNodePath.substring(0, newNodePath.length - 1).concat(index.toString());
            index++;
        }
        
        // Create a new tree node properties
        const newNodeProps = {
            metadata: {
                datatype: "String",
                fieldname: "default" + index,
                defaultValue: "",
            },
            fields: {}
        }
        console.timeEnd('hehe')
        // Add the new tree node to the props data
        return _.set(params, newNodePath, newNodeProps);
    }

    return {
        add
    }
}