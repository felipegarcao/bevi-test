import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HttpClientSpy } from '@/tests/data/mocks/mock-http'
import { RegisterProducts } from '@/presentation/pages/signed-in/managaments/products/register'
import { RemoteProducts } from '@/data/usecases/remote/remote-products'
import { DomainProduct } from '@/domain/models/product'
import { Provider } from 'react-redux'
import { store } from '@/infra/redux-store/store'


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

   // Functionality tests are in usecase

  test('Should render product register form with no receive product from params', () => {
    const { getByTestId } = render(MakeSut())
    const pageTitle = getByTestId('PageTitle') as HTMLParagraphElement
    expect(pageTitle.textContent).toBe("Cadastrar Produto")
  })


})