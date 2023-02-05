export function KeyBind(event: KeyboardEvent, key_code: number,  bind_function: (event: KeyboardEvent) => void, preventDefault: boolean = true): void {
  if(event.keyCode === key_code){
    bind_function(event);
    if(preventDefault) event.preventDefault();
  }
}
