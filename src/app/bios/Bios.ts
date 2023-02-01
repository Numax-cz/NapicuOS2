import {InformationInterface} from "./interface/NapicuBiosInformations";
import {BiosPostExceptionCodes} from "./enums/BiosException";
import {TextScreenComponent} from "./components/text-screen/text-screen.component";

import {SpeedControl} from "./scripts/SpeedControl";
import {ConfigurationComponent} from "./components/configuration/configuration.component";
import {VirtualComputer} from "../computer/VirtualComputer";
import {BiosConfig} from "../config/bios/Bios";
import {Grub} from "@Napicu/Grub/Grub";
import {
  HardwareCPUInformationInterface,
  HardwareDRVInformationInterface,
  HardwareGPUInformationInterface,
  HardwareRAMInformationInterface
} from "../computer/interface/NapicuHardware";
import {CookiesConfig} from "../config/web/CookiesConfig";
import {PathConfig} from "../config/web/PathConfig";
import {Cookies} from "../utils/Cookies";
import {WebManager} from "../utils/WebManager";
import {ArrayOfMaxLength3} from "../utils/Utils";


export class Bios  {
  protected static declare biosConfiguration: InformationInterface;

  public static init(){
    this.load_bios_config();
  }

  public static start_boot(): void {
      this.redirect_text_screen();
      this.post();
  }

  protected static async post(): Promise<void> {
    //TODO Check Hardware
    //TODO Check available bootable drive
    //TODO Start Booting

    return new Promise<void>(async () => {

      //await this.check_hardware();

      await this.get_grub_file().then((grub: Grub) => {
        grub.init();
      }, (reason) => {
        switch (reason as BiosPostExceptionCodes) {
          case BiosPostExceptionCodes.no_bootable_device:
            TextScreenComponent.print_lines([
              'Please reboot and select proper Boot device.',
              '',
              'Press F1 to reboot device.',
            ]);

            TextScreenComponent.add_event("keydown", (e: KeyboardEvent) => {
              if(e.keyCode == 112) {
                this.clear_text_screen();
                setTimeout(() => {VirtualComputer.reboot()}, SpeedControl.calculate_hardware_speed(BiosConfig.BOOT_ERROR_REBOOT_TIME));
                e.preventDefault();
              }
            });

            TextScreenComponent.add_cursor_to_end();
            break;
        }
      });
    });
  }

  protected static check_hardware(): Promise<any> {
    return new Promise<any>((resolve, reject)  => {

    })
  }

  protected static get_grub_file(): Promise<Grub> { //TODO Promise
    return new Promise<Grub>((resolve, reject) => {
      let i: Grub | undefined = this.get_bootable_file(this.get_selected_drv());
      if(!i) reject(BiosPostExceptionCodes.no_bootable_device);
      else resolve(i);
    })
  }

  public static get_bootable_file(drv: HardwareDRVInformationInterface): Grub | undefined {
    let ckb = drv.data.partitions?.["sda"]?.folders.data?.["boot"]?.files["grub"];
    if(ckb) return ckb.data as Grub;
    return undefined;
  }

  public static get_bios_configuration(): InformationInterface{
    if (!this.biosConfiguration){
      this.biosConfiguration = Cookies.getCookies
        <InformationInterface>(CookiesConfig.BIOS_COOKIES_NAME) || BiosConfig.DEFAULT_CONFIGURATION;
    }
    return this.biosConfiguration;
  }

  protected static load_bios_config(): void {
    this.biosConfiguration = this.get_bios_configuration();
  }

  protected static save_bios_config(): void {
    this.load_time_from_configuration();
    Cookies.setCookies<InformationInterface>(CookiesConfig.BIOS_COOKIES_NAME, this.biosConfiguration);
  }

  protected static no_bootable_device_error(): void {
    WebManager.navigate_angular_router(PathConfig.BIOS_TEXT_SCREEN_PATH);
  }

  public static enter_bios_configuration(): void {
    WebManager.navigate_angular_router(PathConfig.BIOS_CONFIGURATION_ROOT_PATH, BiosConfig.ENTER_BIOS_TIME_DELAY);
  }

  public static exit_bios_configuration_with_save(): void {
    this.save_bios_config();
  }

  public static exit_bios_configuration_without_save(): void {
    this.biosConfiguration = ConfigurationComponent.last_configuration;
    this.save_bios_config();
  }

  public static load_default_bios_configuration(): void {
    this.biosConfiguration = BiosConfig.DEFAULT_CONFIGURATION;
    this.save_bios_config();
  }

  public static redirect_text_screen(): void {
    if(WebManager.get_angular_router_path() !== PathConfig.BIOS_TEXT_SCREEN_PATH){
      WebManager.navigate_angular_router(PathConfig.BIOS_TEXT_SCREEN_PATH);
    }
  }

  public static clear_text_screen(): void {
    TextScreenComponent.clear();
  }


  public static get_cpu(): HardwareCPUInformationInterface {
    return VirtualComputer.get_hardware().cpu;
  }

  public static get_ram(): HardwareRAMInformationInterface[] {
    return VirtualComputer.get_hardware().ram;
  }

  public static get_ram_total_memory(): number {
    let i: number = 0;
    VirtualComputer.get_hardware().ram.forEach((ram: HardwareRAMInformationInterface) => {
      i += ram.speed;
    })
    return i;
  }

  public static get_serial_number(): string{
    return VirtualComputer.get_hardware().serial_number;
  }

  public static get_gpu(): HardwareGPUInformationInterface {
    return VirtualComputer.get_hardware().gpu;
  }

  public static get_drv(): HardwareDRVInformationInterface[] {
    return VirtualComputer.get_hardware().drv;
  }

  public static get_selected_drv(): HardwareDRVInformationInterface {
    return VirtualComputer.get_hardware().drv[this.biosConfiguration.selected_drive];
  }

  public static get_bios_full_version(): string {
    return `${this.get_bios_version()} ${this.get_bios_version_company_name()} ${this.get_bios_version_date()}`;
  }

  public static get_bios_version(): string {
    return BiosConfig.BIOS_VERSION;
  }

  public static get_bios_version_company_name(): string {
    return BiosConfig.BIOS_VERSION_COMPANY_NAME;
  }

  public static get_bios_version_date(): string {
    return BiosConfig.BIOS_VERSION_DATE;
  }

  protected static load_time_from_configuration(): void {
    this.biosConfiguration.time = this.get_bios_configuration_time();
    this.biosConfiguration.date = this.get_bios_configuration_date();
  }

  protected static get_bios_configuration_time(): ArrayOfMaxLength3<number> {
    if(ConfigurationComponent.clock_cache){
      return [
        ConfigurationComponent.clock_cache.option.numbers[0].value,
        ConfigurationComponent.clock_cache.option.numbers[1].value,
        ConfigurationComponent.clock_cache.option.numbers[2].value
      ];
    }
    return [0, 0, 0];
  }

  protected static get_bios_configuration_date(): ArrayOfMaxLength3<number> {
    if(ConfigurationComponent.date_cache){
      return [
        ConfigurationComponent.date_cache.option.numbers[0].value,
        ConfigurationComponent.date_cache.option.numbers[1].value,
        ConfigurationComponent.date_cache.option.numbers[2].value
      ];
    }
    return [0, 0, 0];
  }
}
