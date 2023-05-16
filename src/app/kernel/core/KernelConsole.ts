export class KernelConsole {
  private lines: string[] = [];

  private working_directory: string = "/";

  public clear_lines(): void {
    this.lines = [];
  }

  public get_lines(): string[] {
    return this.lines;
  }

  public async get_input(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      let input: string = "";
      window.addEventListener("keydown", function key_input_listener(event: KeyboardEvent) {
        if(event.keyCode === 13) {
          window.removeEventListener("keydown", key_input_listener, true);
          resolve(input);
        }
        if(event.key.length == 1) input += event.key;
      }, true);
    });
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
