import {Component, OnInit} from '@angular/core';
import {KernelCoreGUIComponent} from "@Napicu/System/Kernel/core/gui/Gui";

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['../../styles/system/Core.scss']
})
export class SystemComponent extends KernelCoreGUIComponent implements OnInit{

  public wallpaper: string | null = null;

  public get_display_component() {

  }

  ngOnInit() {
    this.wallpaper = SystemComponent.get_wallpaper();

  }


}
