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
