export class KernelConsole {
  private lines: string[] = [];

  private working_directory: string = "/";

  public get_lines(): string[] {
    return this.lines;
  }

  public get_working_directory(): string {
     return this.working_directory;
  }

  public println(value: string): void {
    this.lines.push(value);
  }

  public print(value: string): void {
    this.lines[this.lines.length - 1] += value;
  }

}
