/// <reference path="./computer/VirtualComputer.ts" />
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public ngOnInit() {
    NapicuVirtualComputer.VirtualComputer.start();
  }
}
