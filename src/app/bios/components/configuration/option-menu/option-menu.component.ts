import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {BiosConfig} from "@Napicu/Config/bios/Bios";

@Component({
  selector: 'bios-option-menu',
  templateUrl: './option-menu.component.html',
  styleUrls: ['./option-menu.component.scss']
})
export class OptionMenuComponent implements OnInit, OnDestroy, AfterViewInit{

  protected last_selected_option: number = 0;

  @Output()
  public onEsc = new EventEmitter<void>();

  @Input() public declare onChangeValue: (value: number) => void;

  @Input() public declare title?: string;

  @Input() public options: string[] = [];

  @Input() public row_options: boolean = false;

  @Input() public selected_option = 0;

  ngOnInit() {
    window.addEventListener("keydown", this.onKeyDownEvent);
  }

  ngAfterViewInit() {
    this.last_selected_option = this.selected_option;
  }

  ngOnDestroy() {
    window.removeEventListener("keydown", this.onKeyDownEvent);
  }

  protected onKeyDownEvent = (e: KeyboardEvent) => {
    if(e.keyCode      === BiosConfig.BIOS_CONFIGURATION_MOVE_RIGHT &&  this.row_options) this.move_down_option();
    else if(e.keyCode === BiosConfig.BIOS_CONFIGURATION_MOVE_LEFT  &&  this.row_options) this.move_up_option();
    else if(e.keyCode === BiosConfig.BIOS_CONFIGURATION_MOVE_UP    && !this.row_options) this.move_up_option();
    else if(e.keyCode === BiosConfig.BIOS_CONFIGURATION_MOVE_DOWN  && !this.row_options) this.move_down_option();
    else if(e.keyCode === BiosConfig.BIOS_CONFIGURATION_ON_ENTER) this.on_enter();
    else if(e.keyCode === BiosConfig.BIOS_CONFIGURATION_ON_ESC) this.on_esc();
  }

  protected move_up_option(): void {
    if(this.selected_option > 0) this.selected_option--;
    this.onChangeValue(this.selected_option);
  }

  protected move_down_option(): void {
    if(this.selected_option < this.options.length - 1) this.selected_option++;
    this.onChangeValue(this.selected_option);
  }

  protected on_enter(): void {
    this.onEsc.emit();
  }

  protected on_esc(): void {
    this.onChangeValue(this.last_selected_option);
    this.onEsc.emit();
  }
}
