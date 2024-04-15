import { GetStorage, SetStorage } from "../../data/protocols/cache"

export class LocalStorageCache<R = any> implements GetStorage<R>, SetStorage{
  set (key: string, value?: object): void {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value))
    } else {
      localStorage.removeItem(key)
    }
  }

  get (key: string): R {
    return JSON.parse(localStorage.getItem(key) ?? '')
  }

}