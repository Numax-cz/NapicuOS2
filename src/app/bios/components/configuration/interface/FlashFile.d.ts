export declare interface BiosRomVersion{
  board: string,
  date: string,
  version: string
}

export declare interface FlashFile{
  rom_information: BiosRomVersion
}
