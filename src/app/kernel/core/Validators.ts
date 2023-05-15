import {User} from "@Napicu/System/Kernel/core/User";
import {KernelConfig} from "@Napicu/Config/system/Kernel";
import {check_string_match, check_string_min_max_length} from "@Napicu/Utils/String";
import {KernelException} from "@Napicu/System/Kernel/core/exceptions/exceptions";
import {KernelExceptionsCodes} from "@Napicu/System/Kernel/config/exceptions";

export class UserValidator {
  public static check_new_user(username: string, users_list: User[]): void {
    if(this.check_user_exist(username, users_list)) {
      throw new KernelException(KernelExceptionsCodes.REGEX_FAIL, "Username already exists");
    }

    if(KernelConfig.KERNEL_USERNAME_REGEX_TEST.test(username)) throw new KernelException(KernelExceptionsCodes.REGEX_FAIL, "Username is invalid");
    const i: KernelExceptionsCodes = check_string_min_max_length(username, KernelConfig.KERNEL_USERNAME_MIN_LENGTH, KernelConfig.KERNEL_USERNAME_MAX_LENGTH);

    if(i == KernelExceptionsCodes.STRING_SHORT) throw new KernelException(i, "Username is too short");
    else if (i == KernelExceptionsCodes.STRING_LONG) throw new KernelException(i, "Username is too long");
  }

  public static check_user_password(password: string): void {
    if(KernelConfig.KERNEL_PASSWORD_REGEX_TEST.test(password)) throw new KernelException(KernelExceptionsCodes.REGEX_FAIL);
     const i: KernelExceptionsCodes = check_string_min_max_length(password, KernelConfig.KERNEL_PASSWORD_MIN_LENGTH, KernelConfig.KERNEL_PASSWORD_MAX_LENGTH);

     if(i == KernelExceptionsCodes.STRING_SHORT) throw new KernelException(i, "Password is too short");
     else if (i == KernelExceptionsCodes.STRING_LONG) throw new KernelException(i, "Password is too long");
  }

  private static check_user_exist(username: string, users_list: User[]): boolean {
    for (const user of users_list) if(check_string_match(user.get_username(), username)) return true;
    return false;
  }
}
