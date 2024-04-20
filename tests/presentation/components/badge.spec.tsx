import { render, screen } from '@testing-library/react';
import { Badge } from '@/presentation/components/Badge';


const makeSut = (status: number) => {
  render (
    <Badge status={status} />
  )
}

describe('Badge Component', () => {

  test('should render "in stock" with class "success""', () => {
    makeSut(1)
    const badge = screen.getByText('em Estoque');
    expect(badge).toHaveClass('success');
  });

  test('should render "on Spare" with class "warning"', () => {
    makeSut(2)

    const badge = screen.getByText('em Reposição');
    expect(badge).toHaveClass('warning');
  });

  test('Should render "missing" with class "danger"', () => {
    makeSut(3)

    const badge = screen.getByText('em Falta');
    expect(badge).toHaveClass('danger');
  });

  test('should render nothing for invalid status', () => {
    const { container } = render(<Badge  status={NaN} />);
    expect(container.firstChild).toBeNull();
  });
});
