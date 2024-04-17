import { GetStorage } from '@/data/protocols/cache'

import {faker} from '@faker-js/faker'

export class GetStorageSpy implements GetStorage {
  key: string
  value = faker.helpers.objectValue

  get (key: string) {
    this.key = key
    return this.value
  }
}