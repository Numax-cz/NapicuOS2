export class KernelConsole {
  private lines: string[] = [];

  public get_lines(): string[] {
    return this.lines;
  }

  public println(value: string): void {
    this.lines.push(value);
  }

  public print(value: string): void {
    this.lines[this.lines.length - 1] += value;
  }

}
