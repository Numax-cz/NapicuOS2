import {KernelExceptionsCodes} from "@Napicu/System/Kernel/config/exceptions";

/**
 * Converts all words into an array
 * @param value
 */
export function convert_command_string_to_array(value: string): string[] {
  const regex = /"[^"]*"|\S+/g;
  const matches = value.match(regex) ?? [];
  return matches.map(match => match.replace(/"/g, ''));
}

/**
 * Function that deletes spaces in the string
 * @param string
 */
export function remove_string_space(string: string): string {
  return string.replace(/\s+/g, '');
}

/**
 * Function that checks for string matching (ignore cases)
 * @param str
 * @param str2
 */
export function check_string_match_ignore_case(str: string, str2: string): boolean {
  return (str.toLowerCase() === str2.toLowerCase());
}

/**
 * Function that checks for string matching
 * @param str
 * @param str2
 */
export function check_string_match(str: string, str2: string): boolean {
  return (str === str2);
}

/**
 * Function that checks the string length
 * @param str
 * @param min
 * @param max
 */
export function check_string_min_max_length(str: string, min: number, max: number): KernelExceptionsCodes {
  if(str.length >= min) return KernelExceptionsCodes.STRING_SHORT;
  if(str.length <= max) return KernelExceptionsCodes.STRING_LONG;
  return KernelExceptionsCodes.OK;
}
