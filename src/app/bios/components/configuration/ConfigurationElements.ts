import {biosOptionFunctionReturn, biosOptionTypeMap} from "./interface/ConfigurationElements";
import {ConfigurationComponent} from "./configuration.component";
import {Bios} from "../../Bios";
import {Console} from "../../../utils/Console";


export const BiosOptionElement = <T extends keyof biosOptionTypeMap>(type: T, array: biosOptionTypeMap[T], description: string | null = null): biosOptionFunctionReturn<biosOptionTypeMap[T]> => {
  return {type: type, option: array, description: description}
}

export const BiosOptionEnableDisableElement = (name: string, defaultValue: number = 0, onChange: (newValue: number) => void, description: string | null = null): biosOptionFunctionReturn<biosOptionTypeMap["options"]> => {
  return {type: "options", option: {name: name, options: ["Enabled", "Disabled"], selectedOption: defaultValue, onChange: onChange}, description: description}
}

export const BiosClockElement = (name: string, description: string | null = null, separator: string = ":"): biosOptionFunctionReturn<biosOptionTypeMap["numbers"]> => {
  let i: biosOptionFunctionReturn<biosOptionTypeMap["numbers"]> = {
    type: "clock",
    option: {
      name: name,
      separator: separator,
      numbers: [
        {value: Bios.get_bios_configuration().time[0], min: 0, max: 24}, //Hours
        {value: Bios.get_bios_configuration().time[1], min: 0, max: 60}, //Minutes
        {value: Bios.get_bios_configuration().time[2], min: 0, max: 60}  //Seconds
      ]
    },
    description: description
  }
  if(ConfigurationComponent.clock_cache) Console.print_error("bios clock already exists");
  ConfigurationComponent.clock_cache = i;
  return ConfigurationComponent.clock_cache;
}

export const BiosDateElement = (name: string, description: string | null = null, separator: string = "/",): biosOptionFunctionReturn<biosOptionTypeMap["numbers"]> => {
  let i: biosOptionFunctionReturn<biosOptionTypeMap["numbers"]> = {
    type: "date",
    option: {
      name: name,
      separator: separator,
      numbers: [
        {value: Bios.get_bios_configuration().date[0], min: 1, max: 12},    //Month
        {value: Bios.get_bios_configuration().date[1], min: 1, max: 31},     //Day
        {value: Bios.get_bios_configuration().date[2], min: 1970, max: 3000} //Year
      ]
    },
    description: description
  }
  if(ConfigurationComponent.date_cache) Console.print_error("bios date already exists");
  ConfigurationComponent.date_cache = i;
  return ConfigurationComponent.date_cache;
}

