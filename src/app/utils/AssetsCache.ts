



class AssetsCache{

  public static preload_audio(src: string): void {

  }

  public static preload_image(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject();
      img.src = src;
    });
  }
}
