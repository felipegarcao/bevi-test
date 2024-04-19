import { render, screen } from "@testing-library/react";
import { Button } from "@/presentation/components/Button";

describe("Button component", () => {
  test("Should render Component Button with correctly loading", () => {
    render(<Button loading />);

    const button = screen.getByTestId("loading");
    expect(button.className).toBe("spinner-border spinner-border-sm");
  });
});
