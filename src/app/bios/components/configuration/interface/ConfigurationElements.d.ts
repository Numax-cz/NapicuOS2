import * as NapicuUtils from "@Napicu/Utils";

export interface biosOptionFunctionReturn<T = NapicuUtils.ValueOf<biosOptionTypeMap>>{
  type: keyof biosOptionTypeMap,
  option: T
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
  valueTest: string,
  action: () => void
}

export interface BiosOptionElementTypeOptionMenu {
  name: string,
  value: string,
  selectedOption: 0,
  options: string[]
}
