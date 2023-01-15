import * as NapicuUtils from "@Napicu/Utils";

export interface biosOptionFunctionReturn<T = NapicuUtils.ValueOf<biosOptionTypeMap>>{
  type: keyof biosOptionTypeMap,
  option: T,
  description: string
}

export interface biosOptionTypeMap{
  "information": BiosOptionElementTypeInformation,
  "action": BiosOptionElementTypeAction,
  "options": BiosOptionElementTypeOptionMenu,
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
  selectedOption: 0,
  options: string[]
}
