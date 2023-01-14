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

interface BiosOptionElementTypeInformation{
  name: string,
  value: string
}

interface BiosOptionElementTypeAction{
  name: string,
  valueTest: string,
  action: () => void
}

interface BiosOptionElementTypeOptionMenu {
  name: string,
  value: string,
  selectedOption: 0,
  options: string[]
}
