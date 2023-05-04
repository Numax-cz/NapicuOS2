import {Component, OnDestroy} from '@angular/core';
import {Terminal} from "@Napicu/System/Kernel/core/Terminal";
import {Kernel} from "@Napicu/System/Kernel/NapicuKernel";


@Component({
  selector: 'terminal-system-ui',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss']
})
export class ConsoleComponent implements OnDestroy{
  public static terminal: Terminal | null = null;
  public static kernel: Kernel | null = null;

  ngOnDestroy() {
    ConsoleComponent.terminal = null;
    ConsoleComponent.kernel = null;
  }

  public get_lines(): string[] {
    return ConsoleComponent.terminal?.get_lines() || [];
  }

  public get_os_name(): string {
    return ConsoleComponent.kernel?.get_system_name() || "";
  }

  public get_kernel(): Kernel | null {
    return ConsoleComponent.kernel;
  }

}
