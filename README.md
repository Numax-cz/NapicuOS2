
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
### Get running process by class
```typescript
protected main(): void {
  let p: TestProgram | null = this.get_process_manager().get_running_process_class<TestProgram>(TestProgram);
  if(p) {
    // Do something...
  }
}
```

# How to creat a new system command?
1. Create a new folder for processes example: `src/app/system/TestSystem/commands`
2. Creat a new typescript class `src/app/system/TestSystem/commands/HelloWorld.ts` example:
```typescript
import {Command} from "@Napicu/System/Kernel/core/Command";
import {Kernel} from "@Napicu/System/Kernel/NapicuKernel";
import {CommandsResolveCodes} from "@Napicu/System/Kernel/interface/CommandResolve";
import {CommandResolve} from "@Napicu/System/Kernel/core/CommandResolve";

export class HelloWorldCommand extends Command {
  protected main(kernel: Kernel, args: string[]): CommandPromise {
    return new Promise<CommandResolve>((resolve, reject) => {
      console.log("Hello World");
      resolve(new CommandResolve({code: CommandsResolveCodes.success}));
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
import {HelloWorldCommand} from "./commands/HelloWorld"

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
### Checking the existence of a command
1. Import `CommandsResolveCodes` and `CommandResolve`:
```typescript
import {CommandsResolveCodes} from "@Napicu/System/Kernel/interface/CommandResolve";
import {CommandResolve} from "@Napicu/System/Kernel/core/CommandResolve";
```
Example: 
```typescript
protected main(): void {
  this.run_command("hello_world").then((value: CommandResolve) => {}, (value: CommandResolve) => {
    if(value.code == CommandsResolveCodes.command_not_found) {
      console.log("Command does not exist!");
    }
  });
}
```
### Get command parameters 
```typescript
export class HelloWorldCommand extends Command {
  protected main(kernel: Kernel, args: string[]): CommandPromise {
    return new Promise<CommandResolve>((resolve, reject) => {
        
      console.log(args) //Example: ["-a"]
        
      this.get_param(args, "-a", () => {
        resolve(new CommandResolve({code: CommandsResolveCodes.success, message: "Hello World #1"}));
      });
      
      console.log(args) //Example: [] - Now the 'args' array does not contain '-a'.
      
      resolve(new CommandResolve({code: CommandsResolveCodes.success, message: "Hello World #2"}));
    });
  }
}
```
Now when you add `-a` to the command, you get a different output.
