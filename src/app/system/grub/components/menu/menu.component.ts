import { Component } from '@angular/core';
import {GrubConfig} from "../../../../config/system/GrubConfig";

@Component({
  selector: 'grub-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  get get_full_grub_version(): string {
    return `${GrubConfig.GRUB_VERSION_COMPANY_NAME} ${GrubConfig.GRUB_VERSION}`;
  }
}
