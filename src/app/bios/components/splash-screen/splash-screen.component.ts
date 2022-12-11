import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss']
})
export class SplashScreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  protected readonly enter_bios_configuration = (): void => {
    //TODO Redirect to bios configuration
  }



}
