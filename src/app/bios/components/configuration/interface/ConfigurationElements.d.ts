import * as NapicuUtils from "@Napicu/Utils";

export interface biosOptionFunctionReturn<T = NapicuUtils.ValueOf<biosOptionTypeMap>>{
  type: keyof biosOptionTypeMap,
  option: T,
  description: string | null
}

export interface biosOptionTypeMap{
  "information": BiosOptionElementTypeInformation,
  "action": BiosOptionElementTypeAction,
  "options": BiosOptionElementTypeOptionMenu,
  "numbers": BiosOptionElementTypeNumbers
}

export interface BiosOptionElementTypeInformation{
  name: string,
  value: string
}

export interface BiosOptionElementTypeAction{
  name: string,
  value: string,
  action: () => void
}

export interface BiosOptionElementTypeOptionMenu {
  name: string,
  options: string[]
  selectedOption?: 0,
}

export interface BiosOptionElementTypeNumbers{
  name: string,
  separator: string
  numbers: {value: number, min: number , max: number}[]
}

