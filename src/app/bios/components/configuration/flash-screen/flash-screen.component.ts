import {Component, OnDestroy, OnInit} from '@angular/core';
import {Bios} from "@Napicu/Bios/Bios";
import {BiosConfig} from "@Napicu/Config/bios/Bios";
import {
  DriveBaseFilesAndFoldersStructureInterface,
  DriveDataFilesStructureInterface,
  DriveDataFoldersStructureDataType,
  HardwareDRVInformationInterface
} from "@Napicu/VirtualComputer/interface/NapicuHardware";
import {KeyBind} from "@Napicu/Utils/KeyBind";
import {ALPHABET} from "@Napicu/Utils/interface/Alphabet";
import {BiosRomVersion, FlashFile} from "@Napicu/Bios/components/configuration/interface/FlashFile";
import {OptionMenu} from "@Napicu/Bios/components/configuration/OptionMenu";
import {ProgressBar} from "@Napicu/Bios/scripts/ProgressBar";

@Component({
  selector: 'app-flash-screen',
  templateUrl: './flash-screen.component.html',
  styleUrls: ['./flash-screen.component.scss']
})
export class FlashScreenComponent implements OnInit, OnDestroy{

  public is_active_drive_selection: boolean = true;

  public selected_drive: number = 0;

  public selected_dir: number = 0;

  public drive_data_cache: { name: string, is_dir: boolean }[] = []

  public dirs_history_indexes: {name: string | null, index: number }[] = [{name: null, index: -1}];

  public active_option_menu: OptionMenu | null = null;

  public loaded_new_rom_file: BiosRomVersion | null = null;

  public progress_bar: ProgressBar | null = null;

  public flashing_progress_bar_title: string | null = null;

  public ngOnInit() {
    window.addEventListener("keydown", this.onKeyDownEvent);
  }

  public ngOnDestroy() {
    window.removeEventListener("keydown", this.onKeyDownEvent);
  }

  protected onKeyDownEvent = (e: KeyboardEvent): void => {
    if(!this.active_option_menu){
      KeyBind(e, BiosConfig.BIOS_CONFIGURATION_MOVE_UP, this.move_up);
      KeyBind(e, BiosConfig.BIOS_CONFIGURATION_MOVE_DOWN, this.move_down);
      KeyBind(e, BiosConfig.BIOS_CONFIGURATION_ON_ESC, this.on_esc);
      KeyBind(e, BiosConfig.BIOS_CONFIGURATION_ON_TAB, this.on_tab);
      KeyBind(e, BiosConfig.BIOS_CONFIGURATION_ON_ENTER, this.on_enter);
    } else e.preventDefault();
  }

  protected readonly on_enter = (): void => {
    if(!this.is_active_drive_selection && this.drive_data_cache[this.selected_dir]) {
      //Back
      if (this.drive_data_cache[this.selected_dir].name === "..") {
        this.dirs_history_indexes.pop();
        if (!this.dirs_history_indexes.length) this.dirs_history_indexes = [{name: null, index: -1}];
        return;
      }

      //Set partition
      if (this.dirs_history_indexes[0].index == -1) {
        this.dirs_history_indexes[0] = { name:this.drive_data_cache[this.selected_dir].name, index: this.selected_dir};
        this.selected_dir = 0;
        return;
      }

      //Next
      if (this.drive_data_cache[this.selected_dir].is_dir) {
        this.dirs_history_indexes.push({name: this.drive_data_cache[this.selected_dir].name, index: this.selected_dir - 1});
        this.selected_dir = 0;
      } else if (!this.drive_data_cache[this.selected_dir].is_dir){
        let files: DriveDataFilesStructureInterface<any> | undefined = this.get_active_path_directory()?.files;

        let rom_file: FlashFile = files?.[this.drive_data_cache[this.selected_dir].name]?.data as FlashFile;
        if(rom_file.rom_information) {
          this.set_flashing_progress_bar_title("Checking File:");
          this.progress_bar = new ProgressBar(75, () => {
            this.loaded_new_rom_file = rom_file.rom_information;
            const menu = new OptionMenu(["Yes", "No"], null, (value: number) => {
              if(value === 0) this.start_flashing();
              this.active_option_menu = null;
            });

            menu.set_title("Are you sure to update BIOS?");
            menu.set_background_color("red");
            menu.set_row_option_layout();

            this.active_option_menu = menu;
          });

          this.progress_bar.run();
        } else { //Unsupported file

          const menu = new OptionMenu(["Ok"], null, () => {
            this.active_option_menu = null;
          });

          menu.set_title("Unsupported file");
          menu.set_background_color("red");

          this.active_option_menu = menu;
        }
      }
    }
  }

  protected readonly on_tab = (): void => {
    this.is_active_drive_selection = !this.is_active_drive_selection;
  }

  protected readonly on_esc = (): void => {

  }

  protected readonly move_up = (): void => {
    if (this.is_active_drive_selection){
      this.selected_dir = 0;
      this.dirs_history_indexes = [{name: null, index: -1}];
      if (this.selected_drive > 0) this.selected_drive--
    } else if (this.selected_dir > 0) this.selected_dir--
  }

  protected readonly move_down = (): void => {
    if (this.is_active_drive_selection) {
      this.selected_dir = 0;
      this.dirs_history_indexes = [{name: null, index: -1}];
      if (this.selected_drive + 1 < this.get_drives_names().length) this.selected_drive++
    } else if (this.selected_dir + 1 < this.get_drive_data().length) this.selected_dir++
  }

  public start_flashing(): void {
    this.set_flashing_progress_bar_title("Erasing BIOS:");
    this.progress_bar = new ProgressBar(10, () => {

      this.set_flashing_progress_bar_title("Writing BIOS:");
      this.progress_bar = new ProgressBar(20, () => {

        if(this.loaded_new_rom_file) Bios.flash_bios_rom(this.loaded_new_rom_file);
        this.set_flashing_progress_bar_title("Verifying BIOS:");
        this.progress_bar = new ProgressBar(5, () => {

        });
        this.progress_bar.run();
      });
      this.progress_bar.run();
    });
    this.progress_bar.run();
  }

  public get_drive_data(): { name: string, is_dir: boolean }[]{
    let i: { name: string, is_dir: boolean }[] = [];
    let partitions = Bios.get_drv()[this.selected_drive].partitions;

    if(partitions.length > 1 && this.dirs_history_indexes[0].index == -1) {
      for (const partition of partitions) {
        if (partition.flag) i.push({name: partition.flag, is_dir: false});
      }
    } else {
      if(this.dirs_history_indexes[0].index == -1) this.dirs_history_indexes[0] = {name: null, index: 0};

      const ac_path = this.get_active_path_directory();

      if(this.dirs_history_indexes.length > 0 && partitions.length > 1) i.push({name: "..", is_dir: false});

      const d: DriveDataFoldersStructureDataType | undefined = ac_path?.folders?.data
      const f: DriveDataFilesStructureInterface | undefined = ac_path?.files;

      if (d) {
        let directories_names: string[] = Object.keys(d);
        i = [...i, ...directories_names.map((value: string) => {
          return {name: value, is_dir: true}
        })];
      }

      if (f) {
        let folders_name: string[] = Object.keys(f);
        i = [...i, ...folders_name.map((value: string) => {
          return {name: value, is_dir: false}
        })];
      }
    }

    this.drive_data_cache = i;
    return i;
  }

  public get_active_path_directory(): DriveBaseFilesAndFoldersStructureInterface | undefined {
    let partitions = Bios.get_drv()[this.selected_drive].partitions;
    let ac_path: DriveBaseFilesAndFoldersStructureInterface | undefined = partitions[this.dirs_history_indexes[0].index]?.data;
    for(let i = 1; i < this.dirs_history_indexes.length; i++){
      let folder = partitions[this.dirs_history_indexes[0].index].data?.folders;
      let d: DriveBaseFilesAndFoldersStructureInterface | undefined = folder?.data?.[Object.keys(folder?.data || {})[this.dirs_history_indexes[i].index]];
      if(d) ac_path = d;
      else break;
    }
    return ac_path;
  }

  public get_drives_names(): string[]{
    return Bios.get_drv().map((drive: HardwareDRVInformationInterface, index: number) => {
      let name = drive.name;
      if(name.length > 9) name = `${drive.name.substr(0, 9)}...`;
      return `${this.get_alphabet(index + 2)}: ${name}`
    });
  }

  public set_flashing_progress_bar_title(value: string | null): void {
    this.flashing_progress_bar_title = value;
  }

  public get_bios_version(): string {
    return BiosConfig.BIOS_VERSION;
  }

  public get_bios_rom(): BiosRomVersion {
    return Bios.get_bios_configuration().rom;
  }

  public get_alphabet(index: number): string {
    return ALPHABET[index];
  }
}
