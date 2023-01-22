import * as NapicuUtils from "@Napicu/Utils"
import {biosOptionFunctionReturn, biosOptionTypeMap} from "./interface/ConfigurationElements";
import {ConfigurationComponent} from "./configuration.component";
import * as NapicuBios from "@Napicu/Bios";
import {NapicuDate} from "napicuformatter";


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
        {value: NapicuBios.Bios.get_bios_configuration().time[0], min: 0, max: 24}, //Hours
        {value: NapicuBios.Bios.get_bios_configuration().time[1], min: 0, max: 60}, //Minutes
        {value: NapicuBios.Bios.get_bios_configuration().time[2], min: 0, max: 60}  //Seconds
      ]
    },
    description: description
  }
  if(ConfigurationComponent.clock_cache) NapicuUtils.Console.print_error("bios clock already exists");
  ConfigurationComponent.clock_cache = i;
  return ConfigurationComponent.clock_cache;
}

export const BiosDateElement = (name: string, separator: string = "/", description: string | null = null): biosOptionFunctionReturn<biosOptionTypeMap["numbers"]> => {
  let i: biosOptionFunctionReturn<biosOptionTypeMap["numbers"]> = {
    type: "date",
    option: {
      name: name,
      separator: separator,
      numbers: [
        {value: NapicuBios.Bios.get_bios_configuration().date[0], min: 1, max: 12},    //Month
        {value: NapicuBios.Bios.get_bios_configuration().date[1], min: 1, max: 31},     //Day
        {value: NapicuBios.Bios.get_bios_configuration().date[2], min: 2000, max: 3000} //Year
      ]
    },
    description: description
  }
  if(ConfigurationComponent.date_cache) NapicuUtils.Console.print_error("bios date already exists");
  ConfigurationComponent.date_cache = i;
  return ConfigurationComponent.date_cache;
}

