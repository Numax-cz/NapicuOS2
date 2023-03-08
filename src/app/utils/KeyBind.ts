export function KeyBind(event: KeyboardEvent, key_code: number | number[],  bind_function: (event: KeyboardEvent) => void, preventDefault: boolean = true): void {
  const keys: number[] =  (typeof key_code === "object") ? key_code : [key_code];
  for(const key of keys){
    if(event.keyCode === key){
      bind_function(event);
      if(preventDefault) event.preventDefault();
    }
  }
}
