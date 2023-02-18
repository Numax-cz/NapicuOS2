import {PathConfig} from "@Napicu/Config/web/PathConfig";
import {SpeedControl} from "@Napicu/Bios/scripts/SpeedControl";
import {WebManager} from "@Napicu/Utils/WebManager";
import {Type} from "@angular/core";
import {KernelComponent} from "@Napicu/System/Kernel/components/kernel/kernel.component";
import {ProcessManager} from "@Napicu/System/Kernel/core/ProcessManager";

export abstract class Kernel{

  public process_manager: ProcessManager = new ProcessManager();

  protected readonly abstract system_name: string;

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

  public static set_display_component(component: Type<any>): void {
    KernelComponent.system_display_component = component;
  }

}
