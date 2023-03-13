import {Process} from "@Napicu/System/Kernel/core/Process";
import {Kernel} from "@Napicu/System/Kernel/NapicuKernel";
import {Type} from "@angular/core";

export class DisplayManager extends Process {

  protected process_name: string = "DisplayManager";

  protected application_components: Type<any>[] = [];


  protected main(kernel: Kernel): void {

  }

  protected on_kill = (): void => {
  }


  public set_display(): void {

  }
}
