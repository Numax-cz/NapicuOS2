import * as NapicuConfig from "@Napicu/Config";
import { Component } from '@angular/core';

@Component({
  selector: 'grub-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  get get_full_grub_version(): string {
    return `${NapicuConfig.Grub.GRUB_VERSION_COMPANY_NAME} ${NapicuConfig.Grub.GRUB_VERSION}`;
  }
}
