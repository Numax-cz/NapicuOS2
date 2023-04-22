import {Process} from "@Napicu/System/Kernel/core/Process";
import {Type} from "@angular/core";
import {NapicuOS} from "../../System";
import {SystemComponent} from "../../components/system/system.component";
import {Kernel} from "@Napicu/System/Kernel/NapicuKernel";

export class DisplayManager extends Process {

  protected process_name: string = "DisplayManager";

  protected application_components: Type<any>[] = [];

  protected declare kernel: NapicuOS;

  protected main(kernel: NapicuOS): void {
    this.kernel = kernel;
  }

  protected on_kill = (): void => {
  }


  public set_display(): void {
    SystemComponent.set_wallpaper(this.kernel.get_system_images().default_wallpaper);
    Kernel.set_display_component(SystemComponent);
  }
}
