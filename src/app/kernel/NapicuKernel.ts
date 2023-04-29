import {PathConfig} from "@Napicu/Config/web/PathConfig";
import {SpeedControl} from "@Napicu/Bios/scripts/SpeedControl";
import {WebManager} from "@Napicu/Utils/WebManager";
import {KernelComponent} from "@Napicu/System/Kernel/components/kernel/kernel.component";
import {ProcessManager} from "@Napicu/System/Kernel/core/ProcessManager";
import {NapicuDate} from "napicuformatter";
import {KernelBaseProcessTable} from "@Napicu/System/Kernel/core/SysPrograms";
import {ProcessManagerTable} from "@Napicu/System/Kernel/interface/Process";
import {Console} from "@Napicu/Utils/Console";
import {CookiesConfigurator} from "@Napicu/System/Kernel/core/CookiesConfigurator";
import {SystemCookiesKernelDataInterface, TypeKernelComponent} from "@Napicu/System/Kernel/interface/Kernel";
import {UsersManager} from "@Napicu/System/Kernel/core/UsersManager";
import {TerminalComponent} from "@Napicu/System/Kernel/components/terminal/terminal.component";
import {Terminal} from "@Napicu/System/Kernel/core/Terminal";
import {KernelConfig} from "@Napicu/Config/system/Kernel";
import {CommandManager} from "@Napicu/System/Kernel/core/CommandManager";
import {CommandManagerTable} from "@Napicu/System/Kernel/interface/CommandManager";
import {KernelBaseCommandTable} from "@Napicu/System/Kernel/core/commands/SysCommands";

export abstract class Kernel{
  protected readonly abstract system_name: string;

  private process_manager: ProcessManager = new ProcessManager();

  private user_manager: UsersManager = new UsersManager();

  private command_manager: CommandManager = new CommandManager();


  private initialized_kernel_processes: ProcessManagerTable[] = KernelBaseProcessTable;

  private initialized_kernel_commands: CommandManagerTable[] = KernelBaseCommandTable;


  public time: NapicuDate | null = null;



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

  public get_process_manager(): ProcessManager {
    return this.process_manager;
  }

  public run_process(program_id: number): void {
    this.process_manager.run(program_id, this);
  }

  public run_command(call: string, args: string[] = []): void {
    for(const command of this.initialized_kernel_commands) {
      if(command.call === call) {
        new command.command().run(this, args);
        break;
      }
    }
  }

  public init_process_table(table: ProcessManagerTable[]): void {
    this.initialized_kernel_processes.push(...table);
    this.check_duplicates_table_processes(this.initialized_kernel_processes);
  }

  public init_commands_table(table: CommandManagerTable[]): void {
    this.initialized_kernel_commands.push(...table);
    this.check_duplicates_table_commands(this.initialized_kernel_commands);
  }

  protected check_duplicates_table_processes(table: ProcessManagerTable[]): boolean {
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

  protected check_duplicates_table_commands(table: CommandManagerTable[]): boolean {
    let obj: string[] = [];
    for(let i = 0; i < table.length; i++) {
      if (obj.indexOf(table[i].call) != -1){
        Console.print_error_debug(`Duplicate command: ${table[i].call}`);
        return false;
      }
      obj.push(table[i].call);
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

  public get_initialized_kernel_processes(): ProcessManagerTable[] {
    return this.initialized_kernel_processes;
  }

  public get_initialized_kernel_commands(): CommandManagerTable[] {
    return this.initialized_kernel_commands;
  }
}
