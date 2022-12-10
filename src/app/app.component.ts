/// <reference path="./bios/interface/NapicuBios.d.ts" />
/// <reference path="./bios/bios.ts" />
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public ngOnInit() {
    new NapicuBios.Bios().init();
  }
}
