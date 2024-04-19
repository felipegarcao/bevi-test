import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@/infra/redux-store/store";
import { CardMobile } from "@/presentation/pages/signed-in/managaments/products/list/local-components/card-mobile";
import {
  mockHandleEditProduct,
  mockOnHandleDelete,
  mockRemoteProductsModel,
} from "@/tests/data/mocks/mock-remote-products-list";
import { formattedBRL } from "@/presentation/helpers/formattedBRL";

describe("ListProducts screen", () => {


  test("Should render ListProducts with correctly values on mobile screen", () => {
    const exportProductsMock = mockRemoteProductsModel();

    render(
      <Provider store={store}>
        <CardMobile
          product={exportProductsMock}
          handleEditProduct={mockHandleEditProduct}
          openModalHandleDeleteProduct={() =>
            mockOnHandleDelete(exportProductsMock.id)
          }
        />
      </Provider>
    );

    const name = screen.getByTestId("name");
    expect(name.textContent).toBe(exportProductsMock.name);

    const price = screen.getByTestId("price");
    expect(price.textContent).toBe(formattedBRL(exportProductsMock.price));

    const stock_quantity = screen.getByTestId("stock_quantity");
    expect(stock_quantity.textContent).toBe(
      exportProductsMock.stock_quantity.toString()
    );
  });
});
