import React from "react";
import { IPathMapperData } from "../../components/organisms/spm/types/StateTypes";
import * as _ from "lodash";

const usePathMapper = () => {
  const pathMapperList = React.useRef<IPathMapperData[]>();

  const get = () => {
    return pathMapperList.current;
  };

  const set = (data: IPathMapperData[]) => {
    pathMapperList.current = data;
  };

  return {
    get,
    set,
  };
};

export default usePathMapper;