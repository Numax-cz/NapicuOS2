import {biosOptionFunctionReturn, biosOptionTypeMap} from "./interface/ConfigurationElements";

export const biosOptionElement = <T extends keyof biosOptionTypeMap>(type: T, array: biosOptionTypeMap[T]): biosOptionFunctionReturn<biosOptionTypeMap[T]> => {
  return {type: type, option: array}
}

