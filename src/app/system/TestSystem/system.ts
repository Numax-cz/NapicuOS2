import {Kernel} from "@Napicu/System/Kernel/NapicuKernel";
import {TestProgram} from "./programs/program";
import {ProcessManagerProcessTable} from "@Napicu/System/Kernel/interface/Process";
import {SystemBaseProcessProgramsID} from "./programs/SysPrograms";
import {TestSystemComponent} from "./components/system/system.component";
import {CookiesConfigurator} from "@Napicu/System/Kernel/core/CookiesConfigurator";

export class TestSystem extends Kernel{
  protected readonly system_name: string = "system";

  public declare system_config: CookiesConfigurator<string>;

  public readonly initialized_system_process_table: ProcessManagerProcessTable[] = [
    { process: new TestProgram(), program_id: SystemBaseProcessProgramsID.TestProgram },
  ]

  protected main(): void {
    this.init_process_table(this.initialized_system_process_table);

    this.process_manager.run(SystemBaseProcessProgramsID.TestProgram);


    Kernel.set_display_component(TestSystemComponent);
  }
}
