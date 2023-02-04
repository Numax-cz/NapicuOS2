import {Component, Type} from '@angular/core';

@Component({
  selector: 'kernel-system-ui',
  templateUrl: './kernel.component.html',
  styleUrls: ['./kernel.component.scss']
})
export class KernelComponent {
  public static system_display_component: Type<any> | null = null;

  get get_system_display_component(): Type<any> | null {
    return KernelComponent.system_display_component;
  }
}
