import {Cookies} from "./Cookies";
import {AssetsCache} from "./AssetsCache";
import {Console} from "./Console";
import {Debug} from "./Debug";
import {WebManager} from "./WebManager";

declare type ValueOf<T> = T[keyof T];

export {
  Cookies,
  AssetsCache,
  Console,
  Debug,
  WebManager,
  ValueOf
}
