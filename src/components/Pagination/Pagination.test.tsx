import { render, screen } from '../../__tests__/utils';
import Pagination from './index';

describe('Pagination component', () => {
  it('renders the pagination correctly', () => {
    render(<Pagination count={100} current={1} pages={10} />, { router: 'memory' });

    expect(screen.getAllByTestId('pagination__item')).toHaveLength(11);
  });
});
