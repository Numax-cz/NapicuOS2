import {PathConfig} from "@Napicu/Config/web/PathConfig";
import {SpeedControl} from "@Napicu/Bios/scripts/SpeedControl";
import {WebManager} from "@Napicu/Utils/WebManager";
import {Type} from "@angular/core";
import {KernelComponent} from "@Napicu/System/Kernel/components/kernel/kernel.component";
import {ProcessManager} from "@Napicu/System/Kernel/core/ProcessManager";
import {NapicuDate} from "napicuformatter";
import {KernelBaseProcessTable} from "@Napicu/System/Kernel/core/SysPrograms";
import {ProcessManagerProcessTable} from "@Napicu/System/Kernel/interface/Process";

export abstract class Kernel{

  protected process_manager: ProcessManager = new ProcessManager(this);

  public initialized_kernel_processes: ProcessManagerProcessTable[] = KernelBaseProcessTable;

  protected readonly abstract system_name: string;

  protected abstract main(): void;

  public time: NapicuDate | null = null;

  public init(): void {
    WebManager.navigate_angular_router(PathConfig.SYSTEM_PATH, SpeedControl.calculate_hardware_speed(1000));
    this.init_kernel_processes();
    this.main();
  }

  public init_process_table(table: ProcessManagerProcessTable[]): void {
    this.initialized_kernel_processes.push(...table);
  }

  protected init_kernel_processes(): void {
    for (const processTable of this.initialized_kernel_processes) {
      this.process_manager.run(processTable.program_id);
    }
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
