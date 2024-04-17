import { render } from '@testing-library/react'
import { ListProducts } from '@/presentation/pages/signed-in/managaments/products/list'
import { MockListProducts } from '@/tests/domain/mocks/mock-listProducts'
import { HttpClientSpy } from '@/tests/data/mocks/mock-http'
import { RemoteProducts } from '@/data/usecases/remote/remote-products'
import { Provider } from 'react-redux'
import { store } from '@/infra/redux-store/store'
import { BrowserRouter } from 'react-router-dom'


const mocks = () => {
   const productsMock = MockListProducts()
   const httpClient = new HttpClientSpy()
   const remote = new RemoteProducts(httpClient)

   return {
      productsMock,
      remote
   }
}
describe('ListProducts screen', () => {



   test('Should render ListProducts with correctly ', () => {

      const { productsMock, remote } = mocks()
      const { getByTestId } = render(
         <BrowserRouter>
            <Provider store={store}>
               <ListProducts service={remote} />
            </Provider>
         </BrowserRouter>
      )

      const nomeProdutoText = getByTestId("name-0") as HTMLParagraphElement
      expect(nomeProdutoText.textContent).toBe(productsMock.name)

      const priceText = getByTestId("price-0") as HTMLParagraphElement
      expect(priceText.textContent).toBe(productsMock.price)

      const statusText = getByTestId("status-0") as HTMLParagraphElement
      expect(statusText.textContent).toBe(productsMock.status)

      const estoqueText = getByTestId("stock_quantity-0") as HTMLParagraphElement
      expect(estoqueText.textContent).toBe(productsMock.stock_quantity)

   })
})

