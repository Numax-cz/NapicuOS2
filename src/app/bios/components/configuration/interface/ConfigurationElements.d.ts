
export interface biosOptionFunctionReturn<T = ValueOf<biosOptionTypeMap>>{
  type: keyof biosOptionTypeMap,
  option: T,
  description: string | null
}

export interface biosOptionTypeMap{
  "information": BiosOptionElementTypeInformation,
  "action": BiosOptionElementTypeAction,
  "options": BiosOptionElementTypeOptionMenu,
  "numbers": BiosOptionElementTypeNumbers,
  "clock": BiosOptionElementTypeNumbers
  "date": BiosOptionElementTypeNumbers
}

export interface BiosOptionElementTypeInformation{
  name: string,
  value: string
}

export interface BiosOptionElementTypeAction{
  name: string,
  action: () => void
}

export interface BiosOptionElementTypeOptionMenu {
  name: string,
  options: string[]
  selectedOption: number,
}

export interface BiosOptionElementTypeNumbersNumberInterface{
  value: number,
  min: number,
  max: number
}

export interface BiosOptionElementTypeNumbers{
  name: string,
  separator: string
  numbers: BiosOptionElementTypeNumbersNumberInterface[]
}

