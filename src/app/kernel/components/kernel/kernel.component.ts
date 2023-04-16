import {Component} from '@angular/core';
import {TypeKernelComponent} from "@Napicu/System/Kernel/interface/Kernel";


@Component({
  selector: 'kernel-system-ui',
  templateUrl: './kernel.component.html',
  styleUrls: ['./kernel.component.scss']
})
export class KernelComponent {
  public static system_display_component: TypeKernelComponent<any> | null = null;

  get get_system_display_component(): TypeKernelComponent<any> | null {
    return KernelComponent.system_display_component;
  }
}
