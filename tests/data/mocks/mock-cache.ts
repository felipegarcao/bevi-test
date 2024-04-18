import { GetStorage } from '@/data/protocols/cache'
import { mockReturnAuthentication } from '@/tests/domain/mocks/mock-authentication'


export class GetStorageSpy implements GetStorage {
  key: string
  value = mockReturnAuthentication()

  get (key: string) {
    this.key = key
    return this.value
  }
}