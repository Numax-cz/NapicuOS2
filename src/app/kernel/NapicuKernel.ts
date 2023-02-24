import {PathConfig} from "@Napicu/Config/web/PathConfig";
import {SpeedControl} from "@Napicu/Bios/scripts/SpeedControl";
import {WebManager} from "@Napicu/Utils/WebManager";
import {Type} from "@angular/core";
import {KernelComponent} from "@Napicu/System/Kernel/components/kernel/kernel.component";
import {ProcessManager} from "@Napicu/System/Kernel/core/ProcessManager";
import {NapicuDate} from "napicuformatter";
import {KernelBaseProcess} from "@Napicu/System/Kernel/core/SysPrograms";

export abstract class Kernel{

  protected process_manager: ProcessManager = new ProcessManager(this);

  protected readonly abstract system_name: string;

  protected abstract main(): void;


  public time: NapicuDate | null = null;

  public init(): void {
    WebManager.navigate_angular_router(PathConfig.SYSTEM_PATH, SpeedControl.calculate_hardware_speed(1000));
    this.init_kernel_processes();
    this.main();
  }

  protected init_kernel_processes(): void {
    for (const process of KernelBaseProcess) {
      this.process_manager.add(process);
    }
    this.process_manager.run_all_kernel_base_process();
  }

  public get_system_name(): string{
    return this.system_name;
  }

  public creat_new_partition(name: string): void { //TODO NoVoid

  }

  public get_partition(name: string): void { //TODO NoVoid

  }

  public static set_display_component(component: Type<any>): void {
    KernelComponent.system_display_component = component;
  }

}
