export class SpeedControl{
  public static calculate_hardware_speed(time: number, hw_speed: number): number {
    return time + (time / hw_speed);
  }
}
