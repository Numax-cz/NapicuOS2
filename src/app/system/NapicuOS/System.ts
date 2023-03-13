import {Kernel} from "@Napicu/System/Kernel/NapicuKernel";
import {ProcessManagerProcessTable} from "@Napicu/System/Kernel/interface/Process";
import {DisplayManager} from "./programs/DisplayManager/DisplayManager";
import {SystemBaseProcessProgramsID} from "./programs/SysPrograms";
import {SystemComponent} from "./components/system/system.component";
import {SYSTEM_IMAGES} from "./config/Assets";
import {AssetsCache} from "@Napicu/Utils/AssetsCache";


export class NapicuOS extends Kernel{
  protected readonly system_name: string = "NapicuOS";


  public readonly initialized_system_process_table: ProcessManagerProcessTable[] = [
    {process: new DisplayManager(), program_id: SystemBaseProcessProgramsID.DisplayManager}
  ]

  protected main(): void {



    this.init_process_table(this.initialized_system_process_table);

    this.run_display_manager();

    Kernel.set_display_component(SystemComponent);
  }


  //TODO PROMISE
  public preload_assets(): void {
    let images: SYSTEM_IMAGES[] = Object.values<SYSTEM_IMAGES>(SYSTEM_IMAGES);

    //TODO PROMISE
    for(const src of images) AssetsCache.preload_image(src);
  }


  protected run_display_manager(): void {
    this.process_manager.run(SystemBaseProcessProgramsID.DisplayManager);

    const display_manager_process: DisplayManager | null = this.process_manager.get_running_process_class<DisplayManager>(DisplayManager);
    if(display_manager_process){
      display_manager_process.set_display();
    }
  }

}
