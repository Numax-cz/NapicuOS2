export interface HardwareCPUInformationInterface{
  name: string;
  speed: number;
  tdp: number;
}

export interface HardwareDRVInformationInterface{
  name: string;
  speed: number;
  capacity: number;
  data: DrivePartitionsStructureInterface;
}

export interface HardwareGPUInformationInterface{
  name: string;
  speed: number;
}

export interface HardwareRAMInformationInterface{
  name: string;
  speed: number;
  capacity: number;
}

export interface HardwareInformationInterface{
  cpu: HardwareCPUInformationInterface;
  ram: HardwareRAMInformationInterface[];
  gpu: HardwareGPUInformationInterface;
  drv: HardwareDRVInformationInterface[];
}

export interface DriveBaseFileStructureInterface<file_structure = any> {
  file_name: string,
  data: file_structure
}

export interface DriveBaseFilesAndFoldersStructureInterface {
  folders: DriveDataFoldersStructureInterface,
  files: DriveDataFilesStructureInterface
}

export interface DriveDataFoldersStructureInterface {
  data: {
    [index: string]: DriveBaseFilesAndFoldersStructureInterface | undefined
  }
}

export interface DriveDataFilesStructureInterface<file_structure = any> {
  data: {
    [index: string]: DriveBaseFileStructureInterface<file_structure> | undefined
  }
}

export interface DrivePartitionsStructureInterface{
  partitions: { [index: string]: DriveDataFoldersStructureInterface | undefined }
}


