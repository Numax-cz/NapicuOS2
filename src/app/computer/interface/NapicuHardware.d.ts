export interface HardwareCPUInformationInterface{
  name: string;
  speed: number;
  tdp: number;
  cache: number
}

export interface HardwareDRVInformationInterface{
  name: string;
  speed: number;
  capacity: number;
  data: DrivePartitionsStructureInterface;
}

export interface HardwareBRDInformationInterface{
  name: string;
  speed: number;
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
  brd: HardwareBRDInformationInterface;
  serial_number: string
}

export interface DriveBaseFileStructureInterface<file_structure = any> {
  data: file_structure
}

export type DriveDataFoldersStructureDataType = {
  [index: string]: DriveBaseFilesAndFoldersStructureInterface | undefined
}

export interface DriveBaseFilesAndFoldersStructureInterface {
  folders: DriveDataFoldersStructureInterface,
  files: DriveDataFilesStructureInterface
}

export interface DriveDataFoldersStructureInterface {
  data?: DriveDataFoldersStructureDataType
}

export interface DriveDataFilesStructureInterface<file_structure = any> {
  [index: string]: DriveBaseFileStructureInterface<file_structure> | undefined
}

export interface DrivePartitionsStructureInterface{
  partitions: { [index: string]: DriveBaseFilesAndFoldersStructureInterface | undefined }
}


