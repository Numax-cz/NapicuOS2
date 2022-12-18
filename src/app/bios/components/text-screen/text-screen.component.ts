import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-text-screen',
  templateUrl: './text-screen.component.html',
  styleUrls: ['./text-screen.component.scss']
})
export class TextScreenComponent implements OnDestroy{
  protected static text_screen_lines: string[] = [];

  ngOnDestroy = () => TextScreenComponent.clear_text_screen();

  public static print(text: string): void {
    this.text_screen_lines.push(text);
  }

  protected static clear_text_screen(): void {
    this.text_screen_lines = [];
  }

  public get get_text_screen_lines(): string[] {
    return TextScreenComponent.text_screen_lines;
  }
}
