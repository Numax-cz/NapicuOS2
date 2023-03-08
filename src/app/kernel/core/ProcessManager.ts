import {Process} from "@Napicu/System/Kernel/core/Process";
import {Kernel} from "@Napicu/System/Kernel/NapicuKernel";
import {ProcessManagerProcessTable} from "@Napicu/System/Kernel/interface/Process";
import {Console} from "@Napicu/Utils/Console";

export class ProcessManager{
  protected processes: Process[] = [];

  protected declare kernel: Kernel

  constructor(kernel: Kernel) {
    this.kernel = kernel
  }
  //
  // public add(process: Process): void {
  //   this.processes.push(process);
  // }

  public run(program_id: number): void {
    let id: ProcessManagerProcessTable | undefined = this.kernel.initialized_kernel_processes.find((element: ProcessManagerProcessTable) => element.program_id == program_id);
    if(id){
      this.processes[this.processes.push(id.process) - 1].run(this.kernel, this.processes.length - 1);
    } else Console.print_error_debug(`Process with program id ${program_id} does not exist`);
  }

  public kill_all_processes(): void {
    for(const process of this.processes) {
      process.kill();
    }
  }

  public get_all_processes(): Process[] {
    return this.processes;
  }

  public get_running_process(): Process[] {
    return this.processes.filter((process: Process) => process.get_pid() !== -1);
  }

  public get_processes_by_name(name: string): Process[] {
    return this.processes.filter((process: Process) => process.get_process_name() == name);
  }

  public get_process_by_pid(pid: number): Process | null {
    for(const process of this.processes) {
      if(process.get_pid() === pid) return process;
    }
    return null;
  }



}
