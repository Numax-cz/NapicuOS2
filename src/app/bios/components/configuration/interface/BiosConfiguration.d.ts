import * as NapicuUtils from "@Napicu/Utils";
import {biosOptionFunctionReturn, biosOptionTypeMap} from "./ConfigurationElements";

export declare interface BiosConfigurationOptionsInterface {
  name: string,
  title?: string,
  options: biosOptionFunctionReturn[]
}