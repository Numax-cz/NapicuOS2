import {Process} from "@Napicu/System/Kernel/core/Process";
import {Kernel} from "@Napicu/System/Kernel/NapicuKernel";

export class ProcessManager{
  protected processes: Process[] = [];

  protected declare kernel: Kernel

  constructor(kernel: Kernel) {
    this.kernel = kernel
  }

  public add(process: Process): void {
    this.processes.push(process);
  }

  public creat_new_process(): void {

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
