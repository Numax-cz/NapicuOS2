export class History<T> {
  private history_array: T[] = [];

  public selected: number = -1;

  private declare repeat: boolean;

  public add(value: T): void {
    this.history_array.unshift(value);
  }

  public reset(): void {
    this.selected = -1;
  }

  public clear(): void {
    this.selected = -1;
    this.history_array = [];
  }

  public get_selected(): T | null{
    return this.history_array[this.selected] || null;
  }

  public move_up(): void {
    if(this.selected + 1 < this.history_array.length) this.selected++;
  }

  public move_down(): void {
    if(this.selected > 0) this.selected--;
  }
}
