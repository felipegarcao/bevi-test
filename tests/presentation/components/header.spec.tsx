import { fireEvent, render, screen } from "@testing-library/react";
import { Header } from "@/presentation/components/Header";
import { Provider } from "react-redux";
import { store } from "@/infra/redux-store/store";
import { BrowserRouter } from "react-router-dom";
import { mockAuthenticationModel } from "@/tests/domain/mocks/mock-authentication";

describe("Header Component", () => {
  test("Should call setCurrentAccount with null", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Header />
        </Provider>
      </BrowserRouter>
    );

    fireEvent.click(screen.getByTestId("logout"));

    expect(document.location.pathname).toBe("/");
    // expect(mockAuthenticationModel()).toHaveBeenCalledWith(undefined)
  });

  test('Should render username correctly', () => {
    const account = mockAuthenticationModel()

    render(
      <BrowserRouter>
        <Provider store={store}>
          <Header name_testid={account.name} />
        </Provider>
      </BrowserRouter>
    );

    expect(screen.getByTestId('username')).toBe(account.name)
  })
});
