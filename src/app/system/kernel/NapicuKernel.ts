import {Process} from "./core/Process";
import {PathConfig} from "../../config/web/PathConfig";
import {SpeedControl} from "../../bios/scripts/SpeedControl";
import {WebManager} from "../../utils/WebManager";

export abstract class Kernel{
  protected readonly abstract system_name: string;

  protected running_process: Process[] = [];


  protected abstract main(): void;



  public init(): void {
    WebManager.navigate_angular_router(PathConfig.SYSTEM_PATH, SpeedControl.calculate_hardware_speed(1000));
    this.main();
  }





  public get_system_name(): string{
    return this.system_name;
  }

  public creat_new_partition(name: string): void { //TODO NoVoid

  }

  public get_partition(name: string): void { //TODO NoVoid

  }
}
