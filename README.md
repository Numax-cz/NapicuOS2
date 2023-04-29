
# How to add a new system?
1. Create a new folder in `src/app/system` example: `src/app/system/TestSystem`
2. Create a main typescript file for your system example: `src/app/system/TestSystem/system.ts`
3. Create a main class with a kernel
```typescript
export class TestSystem extends Kernel { }
```
4. Implements all members:
```typescript
import {Kernel} from "@Napicu/System/Kernel/NapicuKernel";
import {CookiesConfigurator} from "@Napicu/System/Kernel/core/CookiesConfigurator";
import {SystemCookiesKernelDataInterface} from "@Napicu/System/Kernel/interface/Kernel";

export class TestSystem extends Kernel {
  protected readonly system_name: string = "system";
 
  public system_config: CookiesConfigurator<SystemCookiesKernelDataInterface<any>> = 
    new CookiesConfigurator<SystemCookiesKernelDataInterface<any>>("config", {data: {}});
  
  protected main(): void { }
}
```
5. Add a new system to the bootloader config in `src/app/config/hardware/ComputerHardware.ts`:

```typescript
partitions: [
  {
    flag: "Boot",
    data: {
      files: {},
      folders: {
        data: {
          boot: {
            files: {
              grub: {data: new Grub([new TestSystem()])} //<----- Here
            },
            folders: {}
          }
        }
      }
    }
  }
]
```

# How to creat a new system process?
1. Create a new folder for processes example: `src/app/system/TestSystem/programs`
2. Creat a new typescript class:
```typescript
import {Process} from "@Napicu/System/Kernel/core/Process";

export class TestProgram extends Process {
  protected process_name: string = "Program";

  protected on_kill = (): void  => { }
  
  protected main(): void { }
}
```

3. Implement a new process into the system:
```typescript
import {Kernel} from "@Napicu/System/Kernel/NapicuKernel";
import {CookiesConfigurator} from "@Napicu/System/Kernel/core/CookiesConfigurator";
import {SystemCookiesKernelDataInterface} from "@Napicu/System/Kernel/interface/Kernel";
import {TestProgram} from "./programs/program";
import {ProcessManagerProcessTable} from "@Napicu/System/Kernel/interface/Process";

export class TestSystem extends Kernel {
  protected readonly system_name: string = "system";
 
  public system_config: CookiesConfigurator<SystemCookiesKernelDataInterface<any>> = 
    new CookiesConfigurator<SystemCookiesKernelDataInterface<any>>("config", {data: {}});

  public readonly initialized_system_process_table: ProcessManagerProcessTable[] = [
    { process: TestProgram, program_id: 1 },
  ]
  
  protected main(): void {
    //Init processes
    this.init_process_table(this.initialized_system_process_table);
  }
}
```

4. Run a process:
```typescript
protected main(): void {
  //Init processes
  this.init_process_table(this.initialized_system_process_table);
      
  //Run a process with program_id 1
  this.process_manager.run(1);
}
```
