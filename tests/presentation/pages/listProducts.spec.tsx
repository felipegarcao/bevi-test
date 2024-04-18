
import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { store } from "@/infra/redux-store/store"
import { CardMobile } from "@/presentation/pages/signed-in/managaments/products/list/local-components/card-mobile"
import { mockHandleEditProduct, mockOnHandleDelete, mockRemoteProductsModel } from "@/tests/data/mocks/mock-remote-products-list"
// import { ListProducts } from "@/presentation/pages/signed-in/managaments/products/list"
// import { RemoteProducts } from "@/data/usecases/remote/remote-products"
// import { HttpClientSpy } from "@/tests/data/mocks/mock-http"
// import { HttpErrorResponse, HttpStatusCode } from "@/data/protocols/http/http-client"
// import { DomainProduct } from "@/domain/models/product"
// import { BrowserRouter } from "react-router-dom"


// type sutType = {
//   sut: RemoteProducts
//   httpClientSpy: HttpClientSpy<DomainProduct, HttpErrorResponse>;
// }

// const makeSut = (): sutType => {
//   const HttpClient = new HttpClientSpy<DomainProduct, HttpErrorResponse>();
//   const sut = new RemoteProducts(HttpClient);
//   return {
//     httpClientSpy: HttpClient,
//     sut,
//   };
// }


describe("ListProducts screen", () => {

  // test('Should render ListProducts with correctly values on desktop screen', async () => {
  //   const { sut, httpClientSpy } = makeSut()
  //   const exportProductsMock = mockRemoteProductsModel()

  //   httpClientSpy.response = {
  //     statusCode: HttpStatusCode.ok
  //   }


  //   await sut.list()


  //   render(
  //     <BrowserRouter>
  //       <Provider store={store}>
  //         <ListProducts service={sut} />
  //       </Provider>
  //     </BrowserRouter>

  //   )



  //   const name = screen.getByTestId("name")
  //   expect(name.textContent).toBe(exportProductsMock.name)

  //   const price = screen.getByTestId("price")
  //   expect(price.textContent).toBe(exportProductsMock.price.toLocaleString("pt-BR", {
  //     style: "currency",
  //     currency: "BRL",
  //   }).trim())

  //   const stock_quantity = screen.getByTestId("stock_quantity")
  //   expect(stock_quantity.textContent).toBe(exportProductsMock.stock_quantity.toString())

  // })

  test('Should render ListProducts with correctly values on mobile screen', () => {
    const exportProductsMock = mockRemoteProductsModel()

    render(
      <Provider store={store}>
        <CardMobile product={exportProductsMock} handleEditProduct={mockHandleEditProduct} openModalHandleDeleteProduct={() => mockOnHandleDelete(exportProductsMock.id)} />
      </Provider>
    )

    const name = screen.getByTestId("name")
    expect(name.textContent).toBe(exportProductsMock.name)

    const price = screen.getByTestId("price")
    expect(price.textContent).toBe(exportProductsMock.price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).trim())

    const stock_quantity = screen.getByTestId("stock_quantity")
    expect(stock_quantity.textContent).toBe(exportProductsMock.stock_quantity.toString())

  })
})