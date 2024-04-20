import { render, screen } from "@testing-library/react";
import { Button, ButtonProps } from "@/presentation/components/Button";

const makeSut = ({ variant, loading, ...rest }: ButtonProps) => {
  render(<Button variant={variant} loading={loading} {...rest} />);
};

describe("Button component", () => {


  test('should render  with class "btn-danger"', () => {
    makeSut({ variant: "danger" });
    const badge = screen.getByTestId("danger");
    expect(badge).toHaveClass("btn-danger");
  });

  test('should render  with class "btn-light"', () => {
    makeSut({ variant: "light" });
    const badge = screen.getByTestId("light");
    expect(badge).toHaveClass("btn-light");
  });


  test('should render  with class "btn-warning"', () => {
    makeSut({ variant: "warning" });
    const badge = screen.getByTestId("warning");
    expect(badge).toHaveClass("btn-warning");
  });

  test('should render  with className empty', () => {
    makeSut({ variant: "ghost" });
    const badge = screen.getByTestId("ghost");
    expect(badge).toHaveClass("btn");
  });

  
  test('should render with default variant if no variant is provided', () => {
    makeSut({});
    const badge = screen.getByTestId("default");
    expect(badge).toHaveClass("btn-dark");
  });

  test("Should render Component Button with correctly loading", () => {
    makeSut({ loading: true });

    const button = screen.getByTestId("loading");
    expect(button.className).toBe("spinner-border spinner-border-sm");
  });
});
