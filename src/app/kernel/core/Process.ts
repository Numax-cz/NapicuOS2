export abstract class Process{
  protected PID: number = -1;

  protected abstract process_name: string;

  public run(): void {

    

    this.main();
  }

  protected abstract main(): void;

  protected abstract on_kill: () => void;




  public get_pid(): number {
     return this.PID;
  }

  public get_process_name(): string {
    return this.process_name;
  }


}
