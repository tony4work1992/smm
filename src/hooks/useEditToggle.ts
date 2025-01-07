import { IInputModelTree } from "../types/IInputModelTree";
import { HookReturnedParams } from "./types";

/**
 * Enable edit mode of the target input.
 * @param hookParams
 * @returns
 */
export const useEditToggle = (hookParams: HookReturnedParams) => {
  const editFieldName = (params: IInputModelTree) => {
    const { fPath } = params;
    const { inputDataManager, modelProcessor } = hookParams;
    const fieldPath = modelProcessor.getInputPath(fPath);
    const modifiedData = inputDataManager.modify(
      `${fieldPath}.metadata.isFieldEdit`,
      true,
    );
    // return inputConverter.convert(unflatten(modifiedData))
    return modifiedData;
  };

  const editDefaultValue = (params: IInputModelTree) => {
    const { fPath } = params;
    const { inputDataManager, modelProcessor } = hookParams;
    const fieldPath = modelProcessor.getInputPath(fPath);
    const modifiedData = inputDataManager.modify(
      `${fieldPath}.metadata.isDefaultValueEdit`,
      true,
    );
    return modifiedData;
  };

  return {
    editDefaultValue,
    editFieldName,
  };
};
