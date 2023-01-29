import {Component, Type} from '@angular/core';

@Component({
  selector: 'kernel-system-ui',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss']
})
export class SystemComponent {
  public static system_display_component: Type<any> | null = null;

  get get_system_display_component(): Type<any> | null {
    return SystemComponent.system_display_component;
  }
}
