import {Process} from "@Napicu/System/Kernel/core/Process";
import {Type} from "@angular/core";
import {NapicuOS} from "../../System";
import {TypeKernelComponent} from "@Napicu/System/Kernel/interface/Kernel";
import {SystemComponent} from "../../components/system/system.component";
import {Kernel} from "@Napicu/System/Kernel/NapicuKernel";

export class DisplayManager extends Process {

  protected process_name: string = "DisplayManager";

  protected application_components: Type<any>[] = [];


  protected main(kernel: NapicuOS): void {

  }

  protected on_kill = (): void => {
  }


  public set_display(): void {
    let component: TypeKernelComponent<any> = SystemComponent;
    //Load Wallpaper
    Kernel.set_display_component(SystemComponent);
  }
}
