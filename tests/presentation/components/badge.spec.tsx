import { render } from '@testing-library/react';
import { Badge } from '@/presentation/components/Badge';

describe('Badge Component', () => {

  test('should render "in stock" with class "success""', () => {
    const { getByText } = render(<Badge status={1} />);
    const badge = getByText('em Estoque');
    expect(badge).toHaveClass('success');
  });

  test('should render "on Spare" with class "warning"', () => {
    const { getByText } = render(<Badge status={2} />);
    const badge = getByText('em Reposição');
    expect(badge).toHaveClass('warning');
  });

  test('Should render "missing" with class "danger"', () => {
    const { getByText } = render(<Badge status={3} />);
    const badge = getByText('em Falta');
    expect(badge).toHaveClass('danger');
  });

  test('should render nothing for invalid status', () => {
    const { container } = render(<Badge  status={NaN} />);
    expect(container.firstChild).toBeNull();
  });
});
