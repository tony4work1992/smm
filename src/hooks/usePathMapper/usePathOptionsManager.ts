import * as _ from "lodash";
import { PathSelectOption } from "../../types/components/atoms/IPathSelectProps";
import { IInputModelTree } from "../../types/IInputModelTree";

export const usePathOptionsManager = () => {
  const build = (items: IInputModelTree[]) => {
    const pathOptions: PathSelectOption[] = [];
    _.forEach(items, (item) => {
      if (_.isNil(item.fPath)) {
        return;
      }

      const option = {
        label: item.fPath,
        value: item.fPath,
      } as PathSelectOption;
      pathOptions.push(option);
    });

    return pathOptions;
  };

  return {
    build,
  };
};
