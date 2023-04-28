import {Component, OnDestroy} from '@angular/core';
import {Terminal} from "@Napicu/System/Kernel/core/Terminal";
import {Kernel} from "@Napicu/System/Kernel/NapicuKernel";


@Component({
  selector: 'terminal-system-ui',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements OnDestroy{
  public static terminal: Terminal | null = null;
  public static kernel: Kernel | null = null;

  ngOnDestroy() {
    TerminalComponent.terminal = null;
    TerminalComponent.kernel = null;
  }

  public get_lines(): string[] {
    return TerminalComponent.terminal?.get_lines() || [];
  }

  public get_os_name(): string {
    return TerminalComponent.kernel?.get_system_name() || "";
  }

}
