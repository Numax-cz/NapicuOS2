export abstract class Command {
  protected abstract on_run(): void;
  

  public run(): void {
    this.on_run();
  }
}
