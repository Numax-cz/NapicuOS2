import {Kernel} from "@Napicu/System/Kernel/NapicuKernel";
import {SystemComponent} from "./components/system/system.component";
import {TestProgram} from "./programs/program";
import {ProcessManagerProcessTable} from "@Napicu/System/Kernel/interface/Process";
import {SystemBaseProcessProgramsID} from "./programs/SysPrograms";

export class TestSystem extends Kernel{
  protected readonly system_name: string = "system";

  public readonly initialized_system_process_table: ProcessManagerProcessTable[] = [
    { process: new TestProgram(), program_id: SystemBaseProcessProgramsID.TestProgram },
  ]

  protected main(): void {
    this.init_process_table(this.initialized_system_process_table);

    this.process_manager.run(SystemBaseProcessProgramsID.TestProgram);


    Kernel.set_display_component(SystemComponent);
  }

}
