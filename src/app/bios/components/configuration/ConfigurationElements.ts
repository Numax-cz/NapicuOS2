import {biosOptionFunctionReturn, biosOptionTypeMap} from "./interface/ConfigurationElements";
import {ConfigurationComponent} from "./configuration.component";


export const BiosOptionElement = <T extends keyof biosOptionTypeMap>(type: T, array: biosOptionTypeMap[T], description: string | null = null): biosOptionFunctionReturn<biosOptionTypeMap[T]> => {
  return {type: type, option: array, description: description}
}

export const BiosClockElement = (name: string, separator: string = "/", description: string | null = null): biosOptionFunctionReturn<biosOptionTypeMap["numbers"]> => {
  let i: biosOptionFunctionReturn<biosOptionTypeMap["numbers"]> = {
    type: "numbers",
    option: {
      name: name,
      separator: separator,
      numbers: [{value: 0, min: 0, max: 24}, {value: 0, min: 0, max: 60}, {value: 0, min: 0, max: 100}]
    },
    description: description
  }
  ConfigurationComponent.clock_cache.push(i);
  return ConfigurationComponent.clock_cache[ConfigurationComponent.clock_cache.length - 1];
}


