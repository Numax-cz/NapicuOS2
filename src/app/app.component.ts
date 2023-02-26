import {Component, OnInit} from '@angular/core';
import {WebManager} from "@Napicu/Utils/WebManager";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent implements OnInit{
  ngOnInit(){
    WebManager.load();

  }
}
