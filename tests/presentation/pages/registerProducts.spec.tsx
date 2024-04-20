import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HttpClientSpy } from '@/tests/data/mocks/mock-http'
import { RegisterProducts } from '@/presentation/pages/signed-in/managaments/products/register'
import { RemoteProducts } from '@/data/usecases/remote/remote-products'
import { DomainProduct } from '@/domain/models/product'
import { Provider } from 'react-redux'
import { store } from '@/infra/redux-store/store'
import { mockRemoteProductsModel } from '../../data/mocks/mock-remote-products-list';


const MakeSut = (product?: DomainProduct) => {
  const httpClient = new HttpClientSpy();
  const remote = new RemoteProducts(httpClient)

  return (
    <Provider store={store}>
      <MemoryRouter initialEntries={[{ pathname: '/cadastro', state: !!product && { product } }]}>
        <RegisterProducts service={remote} />
      </MemoryRouter>
    </Provider>
  )
}

describe('Register Screen', () => {


  
  test('Should render product register form with no receive product from params', () => {
    const product = mockRemoteProductsModel()
    const { getByTestId } = render(MakeSut(product))


    const name = getByTestId('input-entry-name') as HTMLInputElement
    const description = getByTestId('input-entry-description') as HTMLInputElement
    const price = getByTestId('input-entry-price') as HTMLInputElement
    const status = getByTestId('input-entry-status') as HTMLSelectElement
    const stock_quantity = getByTestId('input-entry-stock_quantity') as HTMLInputElement


    expect(name.value).toBe(product.name)
    expect(description.value).toBe(product.description)
    expect(price.value).toBe(product.price.toString())
    expect(status.value).toBe(product.status.toString())
    expect(stock_quantity.value).toBe(product.stock_quantity.toString())


    const pageTitle = getByTestId('PageTitle') as HTMLParagraphElement
    expect(pageTitle.textContent).toBe("Alterar Produto")
  })


  test('Should render product register form with no receive product from params', () => {
    const { getByTestId } = render(MakeSut())
    const pageTitle = getByTestId('PageTitle') as HTMLParagraphElement
    expect(pageTitle.textContent).toBe("Cadastrar Produto")
  })


})