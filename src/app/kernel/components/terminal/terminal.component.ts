import {Component, OnDestroy} from '@angular/core';
import {Terminal} from "@Napicu/System/Kernel/core/Terminal";


@Component({
  selector: 'terminal-system-ui',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements OnDestroy{
  public static terminal: Terminal | null = null;

  ngOnDestroy() {
    TerminalComponent.terminal = null;
  }

  public get_lines(): string[] {
    return TerminalComponent.terminal?.get_lines() || [];
  }

}
