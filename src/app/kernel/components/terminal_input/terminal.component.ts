import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Kernel} from "@Napicu/System/Kernel/NapicuKernel";
import {convert_command_string_to_array} from "@Napicu/Utils/String";
import {CommandResolve} from "@Napicu/System/Kernel/core/CommandResolve";
import {KernelConsole} from "@Napicu/System/Kernel/core/KernelConsole";

@Component({
  selector: 'app-terminal-input',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent {
  @Input() public kernel: Kernel | null = null;

  @Input() public output: KernelConsole | null = null;

  @ViewChild('InputValue') public declare inputValue: ElementRef<HTMLElement>;

  public on_enter(event: Event): void {
    const element: HTMLElement = event.target as HTMLElement;
    this.output?.println(`${this.get_system_information_in()} ${element.innerText}`);

    const input: string[] = convert_command_string_to_array(element.innerText);
    if(input[0].length) {
      this.kernel?.run_command(input[0], input.slice(1)).then((resolve: CommandResolve) => {
        this.print_output(resolve);
      }, (reject: CommandResolve) => {
        this.print_output(reject);
      })
    }

    this.clear_input(element);
    event.preventDefault();
  }

  protected print_output(resolve: CommandResolve) {
    if(this.output) {
      if(resolve.message) this.output.println(resolve.message);
      this.output?.println("");
    }
  }

  public get_system_information_in(): string{
    return `${this.kernel?.get_users_manager().get_active_user().get_username()}@${this.kernel?.get_computer_name()}:${this.output?.get_working_directory()}$`;
  }

  protected clear_input(element: HTMLElement): void {
    element.innerText = '';
  }
}
