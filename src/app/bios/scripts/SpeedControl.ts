import {VirtualComputer} from "../../computer/VirtualComputer";
import {HardwareRAMInformationInterface} from "../../computer/interface/NapicuHardware";

export class SpeedControl{
  public static calculate_hardware_speed(time: number): number {

    let cpu_speed = VirtualComputer.get_hardware().cpu.speed;
    let brd_speed = VirtualComputer.get_hardware().brd.speed;
    let ram_speed: number = 0;

    VirtualComputer.get_hardware().ram.forEach((ram: HardwareRAMInformationInterface) => {
      ram_speed += ram.speed;
    });

    let hw_speed = cpu_speed + brd_speed + ram_speed;

    return time + (time / (hw_speed / 1000));
  }
}
