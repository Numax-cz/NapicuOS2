import {Process} from "@Napicu/System/Kernel/core/Process";
import {Kernel} from "@Napicu/System/Kernel/NapicuKernel";
import {ProcessManagerTable} from "@Napicu/System/Kernel/interface/Process";
import {Console} from "@Napicu/Utils/Console";

export class ProcessManager{
  protected processes: Process[] = [];



  public run(program_id: number, kernel: Kernel): void {
    let id: ProcessManagerTable | undefined = kernel.get_initialized_kernel_processes().find((element: ProcessManagerTable) => element.program_id == program_id);
    if(id){
      let process: Process = new id.process(kernel);
      this.processes[this.processes.push(process) - 1].run(this.processes.length - 1);
    } else Console.print_error_debug(`Process with program id ${program_id} does not exist`);
  }

  public get_running_process_class<T extends Process>(ctor: { new (kernel: Kernel): T }): T | null {
    for (const process of this.get_running_process()) {
      if (process instanceof ctor) {
        return process as T;
      }
    }
    return null;
  }

  public kill_all_processes(): void {
    for(let i = 0; i < this.processes.length; i++) {
      this.processes.slice(i, 1);
    }
  }

  public kill_by_pid(pid: number): void {
    for(let i = 0; i < this.processes.length; i++) {
      if(this.processes[i].get_pid() === pid) {
        this.processes.slice(i, 1);
      }
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
