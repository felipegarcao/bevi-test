import { GetStorage } from "../protocols/cache";


export class LocalStorageCacheSpy<R = any> implements GetStorage{
  key: string;
  objectReturn : R;

  get(key: string) : R {
    this.key = key;
    return this.objectReturn
  }

}