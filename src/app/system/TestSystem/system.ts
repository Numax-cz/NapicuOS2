import {Kernel} from "@Napicu/System/Kernel/NapicuKernel";
import {SystemComponent} from "./components/system/system.component";

export class TestSystem extends Kernel{
  protected readonly system_name: string = "system";

  protected main(): void {
    console.log("Hello World!");
    Kernel.set_display_component(SystemComponent);
  }

}
