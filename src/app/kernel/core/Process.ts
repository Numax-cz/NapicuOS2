import {Kernel} from "@Napicu/System/Kernel/NapicuKernel";
import {Console} from "@Napicu/Utils/Console";

export abstract class Process{

  protected abstract process_name: string;

  private PID: number = -1;

  private user: string = "system";

  protected run_on_run_kernel: boolean = false;

  constructor(private kernel: Kernel) {

  }


  public run(pid: number): void {
    this.PID = pid;
    Console.print_information_debug(`KERNEL - ${this.process_name} running. PID: ${this.PID}`);
    this.main();
  }

  public kill(): void {
    Console.print_information_debug(`KERNEL - ${this.process_name} killed. PID: ${this.PID}`);
    this.on_kill();
    this.kernel.get_process_manager().kill_by_pid(this.get_pid());
  }

  protected abstract main(): void;

  protected abstract on_kill: () => void;


  public get_pid(): number {
     return this.PID;
  }

  public get_process_name(): string {
    return this.process_name;
  }

  public get_is_run_on_kernel_init(): boolean {
    return this.run_on_run_kernel;
  }
}
