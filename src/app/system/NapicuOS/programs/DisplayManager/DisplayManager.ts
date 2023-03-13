import {Process} from "@Napicu/System/Kernel/core/Process";
import {Type} from "@angular/core";
import {NapicuOS} from "../../System";

export class DisplayManager extends Process {

  protected process_name: string = "DisplayManager";

  protected application_components: Type<any>[] = [];


  protected main(kernel: NapicuOS): void {

  }

  protected on_kill = (): void => {
  }


  public set_display(): void {

  }
}
