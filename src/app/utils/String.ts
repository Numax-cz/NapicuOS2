/**
 * Converts all words into an array
 * @param value
 */
export function convert_string_to_array(value: string): string[] {
  return value.split(' ');
}

/**
 * Function that deletes spaces in the string
 * @param string
 */
export function remove_string_space(string: string): string {
  return string.replace(/\s+/g, '');
}
