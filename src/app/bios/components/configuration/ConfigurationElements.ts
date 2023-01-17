import * as NapicuUtils from "@Napicu/Utils"
import {biosOptionFunctionReturn, biosOptionTypeMap} from "./interface/ConfigurationElements";
import {ConfigurationComponent} from "./configuration.component";


export const BiosOptionElement = <T extends keyof biosOptionTypeMap>(type: T, array: biosOptionTypeMap[T], description: string | null = null): biosOptionFunctionReturn<biosOptionTypeMap[T]> => {
  return {type: type, option: array, description: description}
}

export const BiosClockElement = (name: string, separator: string = ":", description: string | null = null): biosOptionFunctionReturn<biosOptionTypeMap["numbers"]> => {
  let i: biosOptionFunctionReturn<biosOptionTypeMap["numbers"]> = {
    type: "clock",
    option: {
      name: name,
      separator: separator,
      numbers: [
        {value: 0, min: 0, max: 24}, //Hours
        {value: 0, min: 0, max: 60}, //Minutes
        {value: 0, min: 0, max: 60} //Seconds
      ]
    },
    description: description
  }
  if(ConfigurationComponent.clock_cache) NapicuUtils.Console.print_error("bios clock already exists");
  ConfigurationComponent.clock_cache = i;
  return ConfigurationComponent.clock_cache;
}


