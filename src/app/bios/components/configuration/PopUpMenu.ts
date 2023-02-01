import {BiosPopUpMenuButtonElementInterface} from "@Napicu/Bios/components/configuration/interface/BiosPopUpMenu";

export class BiosPopUpMenu{
  protected declare title: string;

  protected elements: BiosPopUpMenuButtonElementInterface[] = [];

  protected selected_option: number = 0;

  constructor(title: string) {
    this.title = title;
  }

  public addElement(element: BiosPopUpMenuButtonElementInterface): void {
    this.elements.push(element);
  }

  public get_title(): string{
    return this.title;
  }

  public get_elements(): BiosPopUpMenuButtonElementInterface[]{
    return this.elements;
  }

  public get_selected_option(): number {
    return this.selected_option;
  }
}
