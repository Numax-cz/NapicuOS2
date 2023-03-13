



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


export class ImageCache<T>{

  public declare readonly table: {[index: string]: T};

  constructor(table: {[index: string]: T})  {
    this.table = table;
  }

  public preload(): void {
     const values: T[] = Object.values<T>(this.table);

     for(const value of values) {
        if(typeof value === "string") AssetsCache.preload_image(value);
     }
  }

  public get(src: T): T[] | null {
    return Object.values(this.table) || null;
  }
}


