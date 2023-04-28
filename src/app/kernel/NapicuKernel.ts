import {PathConfig} from "@Napicu/Config/web/PathConfig";
import {SpeedControl} from "@Napicu/Bios/scripts/SpeedControl";
import {WebManager} from "@Napicu/Utils/WebManager";
import {KernelComponent} from "@Napicu/System/Kernel/components/kernel/kernel.component";
import {ProcessManager} from "@Napicu/System/Kernel/core/ProcessManager";
import {NapicuDate} from "napicuformatter";
import {KernelBaseProcessTable} from "@Napicu/System/Kernel/core/SysPrograms";
import {ProcessManagerProcessTable} from "@Napicu/System/Kernel/interface/Process";
import {Console} from "@Napicu/Utils/Console";
import {CookiesConfigurator} from "@Napicu/System/Kernel/core/CookiesConfigurator";
import {SystemCookiesKernelDataInterface, TypeKernelComponent} from "@Napicu/System/Kernel/interface/Kernel";
import {UsersManager} from "@Napicu/System/Kernel/core/UsersManager";
import {TerminalComponent} from "@Napicu/System/Kernel/components/terminal/terminal.component";
import {Terminal} from "@Napicu/System/Kernel/core/Terminal";
import {KernelConfig} from "@Napicu/Config/system/Kernel";
import {CommandManager} from "@Napicu/System/Kernel/core/CommandManager";

export abstract class Kernel{
  protected readonly abstract system_name: string;

  private process_manager: ProcessManager = new ProcessManager(); //TODO

  private user_manager: UsersManager = new UsersManager();

  private command_manager: CommandManager = new CommandManager();


  public time: NapicuDate | null = null;

  public initialized_kernel_processes: ProcessManagerProcessTable[] = KernelBaseProcessTable;

  public declare abstract system_config: CookiesConfigurator<SystemCookiesKernelDataInterface<unknown>>;


  protected abstract main(): void;

  public init(): void {
    WebManager.navigate_angular_router_promise(PathConfig.SYSTEM_PATH, SpeedControl.calculate_hardware_speed(1000)).then(r => {
      this.init_terminal();

      this.system_config.try_load_config_from_cookies();

      this.init_kernel_processes();

      this.main();
    })
  }

  public run_command(program_id: number): void {
    this.process_manager.run(program_id, this);
  }

  public init_process_table(table: ProcessManagerProcessTable[]): void {
    this.check_duplicates_table_processes(table);
    this.initialized_kernel_processes.push(...table);
  }

  protected check_duplicates_table_processes(table: ProcessManagerProcessTable[]): boolean {
    let obj: number[] = [];
    for (let i = 0; i < table.length; i++) {
      if (obj[table[i].program_id]){
        Console.print_error_debug(`Duplicate program_id: ${table[i].program_id}`);
        return false;
      }
      obj[table[i].program_id] = 1;
    }
    return true;
  }

  protected init_kernel_processes(): void {
    TerminalComponent.terminal?.println("Starting Kernel processes")
    for (const processTable of this.initialized_kernel_processes) {
      this.process_manager.run(processTable.program_id, this);
    }
  }

  protected init_terminal(): void {
    Kernel.set_display_component(TerminalComponent);
    TerminalComponent.terminal = new Terminal();
    TerminalComponent.kernel = this;

    TerminalComponent.terminal.println(`Starting ${KernelConfig.KERNEL_VERSION_COMPANY_NAME} - ${KernelConfig.KERNEL_VERSION}`);


  }

  public get_system_name(): string{
    return this.system_name;
  }

  public creat_new_partition(name: string): void { //TODO NoVoid

  }

  public get_partition(name: string): void { //TODO NoVoid

  }

  public get_users_manager(): UsersManager {
    return this.user_manager;
  }

  public static set_display_component(component: TypeKernelComponent<any>): void {
    KernelComponent.system_display_component = component;
  }
}
