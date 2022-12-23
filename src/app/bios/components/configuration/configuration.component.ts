import {Component, OnDestroy, OnInit} from '@angular/core';
import {BiosConfigurationOptionsInterface} from "./interface/BiosConfiguration";
import {MainComponent} from "./components/main/main.component";
import {AdvancedComponent} from "./components/advanced/advanced.component";
import {BootComponent} from "./components/boot/boot.component";
import {ToolsComponent} from "./components/tools/tools.component";
import {ExitComponent} from "./components/exit/exit.component";
import * as NapicuConfig from "@Napicu/Config";
import * as NapicuComputer from "@Napicu/VirtualComputer";

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit, OnDestroy{
  protected static selected_option: number = 0;

  protected static options: BiosConfigurationOptionsInterface[] = [
    {
      name: "main",
      component: MainComponent
    },
    {
      name: "Advanced",
      component: AdvancedComponent
    },
    {
      name: "Boot",
      component: BootComponent
    },
    {
      name: "Tools",
      component: ToolsComponent
    },
    {
      name: "Exit",
      component: ExitComponent
    }
  ];

  public ngOnInit(): void {
    window.addEventListener("keydown", this.onKeyDownEvent);

  }

  public ngOnDestroy() {
    window.removeEventListener("keydown", this.onKeyDownEvent);
  }


  protected onKeyDownEvent = (e: KeyboardEvent) => {

  }

  public static up_option(): void {
    if(this.selected_option < this.options.length) this.selected_option += 1;
  }

  public static down_option(): void {
    if(this.selected_option > 0) this.selected_option -= 1;
  }

  get get_selected_option_item(): BiosConfigurationOptionsInterface {
    return ConfigurationComponent.options[ConfigurationComponent.selected_option];
  }

  get get_selected_option_index(): number{
    return ConfigurationComponent.selected_option;
  }
}
