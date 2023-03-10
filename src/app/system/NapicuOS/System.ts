import {Kernel} from "@Napicu/System/Kernel/NapicuKernel";
import {ProcessManagerProcessTable} from "@Napicu/System/Kernel/interface/Process";
import {DisplayManager} from "./programs/DisplayManager";
import {SystemBaseProcessProgramsID} from "./programs/SysPrograms";
import {SystemComponent} from "./components/system/system.component";


export class NapicuOS extends Kernel{
  protected readonly system_name: string = "NapicuOS";

  public readonly initialized_system_process_table: ProcessManagerProcessTable[] = [
    {process: new DisplayManager(), program_id: SystemBaseProcessProgramsID.DisplayManager}
  ]

  protected main(): void {
    this.init_process_table(this.initialized_system_process_table);


    Kernel.set_display_component(SystemComponent);
  }

}
