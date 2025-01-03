import React from "react";
import { ILevelObject } from "../../../hooks/types";

const ItemLevelAtom: React.FC<ILevelObject> = (props) => {
    return (
        <div className="item-level-wrapper" style={{ width: 20, backgroundColor: 'rgb(68 160 219)', color: 'white', padding: '0px 5px' }}>
            {props.prefix}{props.level}
        </div>
    )
}

export default ItemLevelAtom;