import * as InputBase from "@/presentation/components/Input";

import { render, fireEvent, screen } from "@testing-library/react";
import { faker } from "@faker-js/faker";

const makeSut = (fieldName: string, error?: string): void => {
  render(
    <InputBase.Root error={error}>
      <InputBase.Control name={fieldName} type="text" />
    </InputBase.Root>
  );
};

describe("Input Component", () => {
  test("Should leave the input invalid when you have an error", () => {
    const field = faker.person.firstName();
    makeSut(field, "Input Invalido");

    const input = screen.getByTestId("invalid");

    expect(input).toBeInTheDocument();
  });

  test("Should begin with readOnly", () => {
    const field = faker.person.firstName();
    makeSut(field);


    const input = screen.getByAltText(field) as HTMLInputElement

    expect(input.readOnly).toBe(true);
  });

  test("Should remove readOnly on focus", () => {
    const field = faker.person.firstName();
    makeSut(field);

    
    const input = screen.getByAltText(field) as HTMLInputElement

    fireEvent.focus(input);

    expect(input.readOnly).toBe(false);
  });
});
