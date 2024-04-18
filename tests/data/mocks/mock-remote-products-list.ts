

import { DomainProduct } from '@/domain/models/product';
import { Products } from '@/domain/usecases/remote/remote-products';
import { STATUS } from '@/tests/domain/mocks/mock-listProducts';
import {faker} from '@faker-js/faker';


export interface ProductsList {
  list(): Promise<Products.Model[]>;
}


export const mockRemoteProductsModel = (): Products.Model => ({
  id: faker.number.int(),
  name: faker.person.fullName(),
  price: faker.number.int(),
  description: faker.person.fullName(),
  status: faker.helpers.enumValue(STATUS),
  stock_quantity: faker.number.int(),
})

export const mockRemoteProducstListModel = (): Products.Model[] => ([
  mockRemoteProductsModel(),
  mockRemoteProductsModel(),
  mockRemoteProductsModel()
])




export function mockOnHandleDelete(id: number) {
  console.log("onHandleDelete" + id)
}

export function mockHandleEditProduct(product: DomainProduct) {
  console.log("onHandleEditProduct" + product)
}

export class LoadProductsListSpy implements ProductsList {

  callsCounter = 0;
  products = mockRemoteProducstListModel()

  async list(): Promise<DomainProduct[]> {
    this.callsCounter++
    return this.products
  }
  



}
