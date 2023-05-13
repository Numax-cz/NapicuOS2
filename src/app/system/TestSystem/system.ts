import {Kernel} from "@Napicu/System/Kernel/NapicuKernel";
import {TestProgram} from "./programs/program";
import {ProcessManagerTable} from "@Napicu/System/Kernel/interface/Process";
import {SystemBaseProcessProgramsID} from "./programs/SysPrograms";
import {CookiesConfigurator} from "@Napicu/System/Kernel/core/CookiesConfigurator";
import {SystemCookiesKernelDataInterface} from "@Napicu/System/Kernel/interface/Kernel";
import {TestSystemConfigInterface} from "./interface/config";
import {TestSystemDefaultConfig} from "./config/config";
import {CommandManagerTable} from "@Napicu/System/Kernel/interface/CommandManager";

export class TestSystem extends Kernel{
  protected readonly system_name: string = "system";

  public system_config: CookiesConfigurator<SystemCookiesKernelDataInterface<TestSystemConfigInterface>> =
    new CookiesConfigurator<SystemCookiesKernelDataInterface<TestSystemConfigInterface>>(this.system_name, TestSystemDefaultConfig)

  public readonly initialized_system_process_table: ProcessManagerTable[] = [
    { process: TestProgram, program_id: SystemBaseProcessProgramsID.TestProgram },
  ]

  public readonly initialized_system_command_table: CommandManagerTable[] = []


  protected main(): void {
    this.init_process_table(this.initialized_system_process_table);
    this.init_commands_table(this.initialized_system_command_table);

    this.run_process(SystemBaseProcessProgramsID.TestProgram);

    //Kernel.set_display_component(TestSystemComponent);
  }
}
