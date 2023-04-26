import {Kernel} from "@Napicu/System/Kernel/NapicuKernel";
import {TestProgram} from "./programs/program";
import {ProcessManagerProcessTable} from "@Napicu/System/Kernel/interface/Process";
import {SystemBaseProcessProgramsID} from "./programs/SysPrograms";
import {CookiesConfigurator} from "@Napicu/System/Kernel/core/CookiesConfigurator";
import {SystemCookiesKernelDataInterface} from "@Napicu/System/Kernel/interface/Kernel";
import {TestSystemConfigInterface} from "./interface/config";
import {TestSystemDefaultConfig} from "./config/config";

export class TestSystem extends Kernel{
  protected readonly system_name: string = "system";

  public system_config: CookiesConfigurator<SystemCookiesKernelDataInterface<TestSystemConfigInterface>> =
    new CookiesConfigurator<SystemCookiesKernelDataInterface<TestSystemConfigInterface>>(this.system_name, TestSystemDefaultConfig)

  public readonly initialized_system_process_table: ProcessManagerProcessTable[] = [
    { process: TestProgram, program_id: SystemBaseProcessProgramsID.TestProgram },
  ]

  protected main(): void {
    this.init_process_table(this.initialized_system_process_table);

    this.process_manager.run(SystemBaseProcessProgramsID.TestProgram);


    //Kernel.set_display_component(TestSystemComponent);
  }
}
