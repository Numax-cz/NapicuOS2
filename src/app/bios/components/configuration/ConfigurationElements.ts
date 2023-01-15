import {biosOptionFunctionReturn, biosOptionTypeMap} from "./interface/ConfigurationElements";

export const BiosOptionElement = <T extends keyof biosOptionTypeMap>(type: T, array: biosOptionTypeMap[T], description: string | null = null): biosOptionFunctionReturn<biosOptionTypeMap[T]> => {
  return {type: type, option: array, description: description}
}

