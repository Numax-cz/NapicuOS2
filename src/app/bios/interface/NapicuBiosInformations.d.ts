import {ArrayOfMaxLength3, ArrayOfMaxLength3Readonly} from "@Napicu/Utils/Utils";
import {BiosRomVersion} from "@Napicu/Bios/components/configuration/interface/FlashFile";

export interface InformationInterface {

  rom: BiosRomVersion;

  selected_drive: number;

  date: ArrayOfMaxLength3Readonly<number>,

  time: ArrayOfMaxLength3Readonly<number>,

  network_boot: number,

  wake_on_lan: number,

  amd_svm: number,

  amd_iommu: number,

  boot_mode: number,

  fast_boot: number,

  secure_boot: number,






}




