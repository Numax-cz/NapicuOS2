export class ProgressBar{

  protected declare time: number;

  protected declare callBack: () => void;

  protected declare max_percentage_width: number;

  protected interval_id: any = null;

  protected width: number = 0;

  constructor(time: number, callBack: () => void, max_percentage_width: number = 100) {
    this.time = time;
    this.callBack = callBack;
    this.max_percentage_width = max_percentage_width;
  }

  public run(): void {
    this.interval_id = setInterval(this.frame, this.time);
  }

  protected frame = (): void => {
    const ran_number: number = Math.random();

    if (ran_number < 0.5) setTimeout(this.next_move, this.time * 8);
    else if (ran_number < 0.7) setTimeout(this.next_move, this.time * 11);
    else this.next_move();
  }

  protected next_move = (): void => {
    if (this.width >= this.max_percentage_width) {
      clearInterval(this.interval_id);
      if (this.interval_id == null) return;
      else {
        this.interval_id = null;
        this.callBack();
      }
    } else {
      this.width++;
    }
  }

  public get_width_percentage(): number {
    return this.width;
  }
}
