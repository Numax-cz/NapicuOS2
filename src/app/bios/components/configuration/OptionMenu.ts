export class OptionMenu {
  public declare onChangeValue: ((value: number) => void) | null;

  public declare onEsc: ((value: number) => void) | null;

  protected declare options: string[];

  protected declare title?: string;

  protected row_options: boolean = false;

  protected esc_emitter_enable: boolean = true;

  protected declare selected_option: number;

  protected declare background_color?: string;

  protected declare title_color?: string;

  constructor(options: string[], onChangeValue: ((value: number) => void) | null, onEsc: ((value: number) => void) | null, selectedOption?: number) {
    this.options = options;
    this.onChangeValue = onChangeValue;
    this.onEsc = onEsc;
    this.selected_option = selectedOption ? selectedOption : 0;
  }

  public disable_esc_emitter_callback(): void {
    this.esc_emitter_enable = false;
  }

  public get_is_esc_emitter_enable(): boolean {
    return this.esc_emitter_enable;
  }

  public get_title(): string | undefined {
    return this.title;
  }

  public get_title_color(): string | undefined {
    return this.title_color;
  }

  public get_options(): string[]{
    return this.options;
  }

  public get_background_color(): string | undefined {
    return this.background_color
  }

  public get_selected_option(): number {
    return this.selected_option;
  }

  public is_row_options(): boolean {
    return this.row_options;
  }

  public set_row_option_layout(): void {
    this.row_options = true;
  }

  public set_title(title: string): void {
    this.title = title;
  }

  public set_title_color(color: string): void {
    this.title_color = color;
  }

  public set_background_color(color: string): void {
    this.background_color = color;
  }
}
