import React from "react";
import { PathSelectOption } from "../../@types/components/atoms/IPathSelectProps";
import { IInputModelTree } from "../../@types/IInputModelTree";
import * as _ from "lodash";

export const usePathOptionsManager = () => {
  const pathOptions = React.useRef<PathSelectOption[]>([]);

  const build = (items: IInputModelTree[]) => {
    _.forEach(items, (item) => {
      if (_.isNil(item.fPath)) {
        return;
      }

      const option = {
        label: item.fPath,
        value: item.fPath,
      } as PathSelectOption;
      pathOptions.current.push(option);
    });

    return pathOptions.current;
  };

  const get = () => pathOptions.current;

  const reset = () => {
    pathOptions.current.length = 0;
  };

  return {
    build,
    get,
    reset,
  };
};
