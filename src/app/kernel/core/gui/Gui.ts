export abstract class KernelCoreGUIComponent {
  private static wallpaper: string | null = null

  public static set_wallpaper(src: string): void {
    this.wallpaper = src;
  }

  public static get_wallpaper(): string | null {
    return this.wallpaper;
  }
}
