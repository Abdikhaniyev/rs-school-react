import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

import { Pagination } from '@/components';
import { createMockRouter } from '@/test-utils/createMockRouter';
import { render, screen } from '@/test-utils/utils';

describe('Pagination component', () => {
  it('renders the pagination correctly', () => {
    const router = createMockRouter({});

    render(
      <RouterContext.Provider value={router}>
        <Pagination count={100} current={1} pages={10} />
      </RouterContext.Provider>
    );

    expect(screen.getAllByTestId('pagination__item')).toHaveLength(11);
  });
});
