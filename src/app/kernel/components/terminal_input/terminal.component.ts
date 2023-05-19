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

  @Input() public output: KernelConsole | null = null; //TODO move

  public running_command: boolean = false;


  @ViewChild('InputValue') public declare inputValue: ElementRef<HTMLElement>;

  public on_keydown(event: KeyboardEvent): void {
    if(this.running_command) {
      event.preventDefault();
      return;
    }

    const element: HTMLElement = event.target as HTMLElement;

    if(event.keyCode == 13) {
      event.preventDefault();
      this.output?.println(`${this.get_system_information_in()} ${element.innerText}`);

      this.output?.get_command_history().add(element.innerText);

      const input: string[] = convert_command_string_to_array(element.innerText);
      if (input[0]?.length) {
        this.running_command = true;
        this.kernel?.run_command(input[0], input.slice(1), this.output || undefined).then((resolve: CommandResolve) => {
          this.print_output(resolve);
          this.clear_input(element);
        }, (reject: CommandResolve) => {
          this.print_output(reject);
          this.clear_input(element);
        })
      }
    } else if(event.keyCode == 38 || event.keyCode == 40) {
      event.preventDefault();
      if(event.keyCode == 38) this.output?.get_command_history().move_up();
      else if(event.keyCode == 40) this.output?.get_command_history().move_down();

      element.innerText = this.output?.get_command_history().get_selected() || element.innerText;
      return;
    }

    this.output?.get_command_history().reset();
  }

  protected print_output(resolve: CommandResolve) {
    if(this.output) {
      if(resolve.message) this.output.println(resolve.message);
      this.output?.println("");
      this.running_command = false;
    }
  }

  public get_system_information_in(): string{
    return `${this.kernel?.get_users_manager().get_active_user().get_username()}@${this.kernel?.get_computer_name()}:${this.output?.get_working_directory()}$`;
  }

  protected clear_input(element: HTMLElement): void {
    element.innerText = '';
  }
}
