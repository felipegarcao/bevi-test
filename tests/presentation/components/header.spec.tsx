import { fireEvent, render } from "@testing-library/react";

import { Provider, useDispatch } from "react-redux";
import { store } from "@/infra/redux-store/store";
import { MemoryRouter } from "react-router-dom";

import { Header } from "@/presentation/components/Header";
import { DomainUser } from "@/domain/models/user";
import { AnyAction } from "@reduxjs/toolkit";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

const useDispatchMock = useDispatch as unknown as jest.Mock;

describe("Login Screen", () => {
  const dispatchResultRecorder = {} as any;
  const fakeDispatch = (action: AnyAction) => {
    let payload = action.payload;
    if (payload === undefined) {
      payload = "void";
    }
    dispatchResultRecorder[action.type] = payload;
  };

  useDispatchMock.mockImplementation(() => fakeDispatch);

  test("Should render header and action click button with logout", () => {
    const initialState: DomainUser = {
      id: 0,
      name: "",
      email: "",
      email_verified_at: false,
      updated_at: "",
      created_at: "",
    };

    const { getByTestId } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(getByTestId("logout"));
    useDispatchMock.mockClear();

    expect(store.getState().persistedReducers.user).toEqual(initialState);
  });

  test("Should render logo correctly", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    const image = getByTestId("logo");

    expect(image).toHaveAttribute(
      "src",
      "https://www.bevioficial.com.br/_next/static/media/bevi-default-m.da7ba5cc.svg"
    );
    expect(image).toHaveAttribute("width", "70");
    expect(image).toHaveAttribute("height", "40");
  });


  
});
