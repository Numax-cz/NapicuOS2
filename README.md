
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
2. Creat a new typescript class `src/app/system/TestSystem/programs/TestProgram.ts` example: 
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

# How to creat a new system command?
1. Create a new folder for processes example: `src/app/system/TestSystem/commands`
2. Creat a new typescript class `src/app/system/TestSystem/commands/HelloWorld.ts` example:
```typescript
import {Command} from "@Napicu/System/Kernel/core/Command";
import {Kernel} from "@Napicu/System/Kernel/NapicuKernel";

export class HelloWorldCommand extends Command {
  protected main(kernel: Kernel, args: string[]): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      console.log("Hello World");
      resolve(1);
    });
  }
}
```
3. Implement a new command into the system:
```typescript
import {Kernel} from "@Napicu/System/Kernel/NapicuKernel";
import {CookiesConfigurator} from "@Napicu/System/Kernel/core/CookiesConfigurator";
import {SystemCookiesKernelDataInterface} from "@Napicu/System/Kernel/interface/Kernel";
import {TestProgram} from "./programs/program";
import {ProcessManagerProcessTable} from "@Napicu/System/Kernel/interface/Process";

export class TestSystem extends Kernel{
  protected readonly system_name: string = "system";

  public system_config: CookiesConfigurator<SystemCookiesKernelDataInterface<any>> =
    new CookiesConfigurator<SystemCookiesKernelDataInterface<any>>("config", {data: {}});

  public readonly initialized_system_process_table: ProcessManagerProcessTable[] = [
    { process: TestProgram, program_id: 1 },
  ]

  public readonly initialized_system_command_table: CommandManagerTable[] = [
    { command: HelloWorldCommand, call: "helloworld" },
  ]

  protected main(): void {
    //Init processes
    this.init_process_table(this.initialized_system_process_table);
    //Init commands
    this.init_commands_table(this.initialized_system_command_table);
  }
}
```
4. Run a command:
```typescript
protected main(): void {
  //Init commands
  this.init_commands_table(this.initialized_system_command_table);
      
  //Run a helloworld command
  this.run_command("helloworld");
}
```
