import {biosOptionFunctionReturn, biosOptionTypeMap} from "./interface/ConfigurationElements";

export const BiosOptionElement = <T extends keyof biosOptionTypeMap>(type: T, array: biosOptionTypeMap[T], description: string = ""): biosOptionFunctionReturn<biosOptionTypeMap[T]> => {
  return {type: type, option: array, description: description}
}

