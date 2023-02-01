export class OptionMenu {
  public declare onChangeValue: (value: number) => void;

  protected declare options: string[];

  protected declare title?: string;

  protected row_options: boolean = false;

  protected declare selected_option: number;


  constructor(options: string[], onChangeValue: (value: number) => void, selectedOption?: number){
    this.options = options;
    this.onChangeValue = onChangeValue;
    this.selected_option = selectedOption ? selectedOption : 0;
  }

  public get_title(): string | undefined{
    return this.title;
  }

  public get_options(): string[]{
    return this.options;
  }

  public get_selected_option(): number {
    return this.selected_option;
  }

  public is_row_options(): boolean{
    return this.row_options;
  }

  public set_row_option_layout(): void{
    this.row_options = true;
  }

  public set_title(title: string): void {
    this.title = title;
  }
}
