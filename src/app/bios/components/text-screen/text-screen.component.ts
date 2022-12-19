import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-text-screen',
  templateUrl: './text-screen.component.html',
  styleUrls: ['./text-screen.component.scss']
})
export class TextScreenComponent implements OnDestroy{
  protected static text_screen_lines: string[] = [];
  protected static cursor_position: number = -1;
  protected static events: { name: any, fun: (this: Window, ev: any ) => void }[] = [];

  ngOnDestroy = () => TextScreenComponent.clear();

  public static print(text: string): void {
    this.text_screen_lines.push(text);
  }

  public static print_lines(lines: string[]): void {
    for (let i = 0; i < lines.length; i++){
      this.print(lines[i]);
    }
  }

  public static add_cursor_to_end(): void {
    this.print("<div class='cursor'>_</div>");
    this.cursor_position = this.text_screen_lines.length;
  }

  public static add_event<K extends keyof WindowEventMap>(type: K, listener: (this: Window, ev: WindowEventMap[K]) => any): void {
    this.events.push({name: type, fun: listener});
    window.addEventListener(type, listener);
  }

  protected static clear(): void {
    this.text_screen_lines = [];
    for (let i = 0; i < this.events.length; i++) {
      window.removeEventListener(this.events[i].name, this.events[i].fun);
    }
    this.events = [];
  }

  public get get_text_screen_lines(): string[] {
    return TextScreenComponent.text_screen_lines;
  }
}
