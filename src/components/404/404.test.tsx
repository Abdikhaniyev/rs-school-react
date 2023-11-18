import { render, screen } from '../../__tests__/utils';
import { Route, Routes } from 'react-router-dom';
import Page404 from './index';

describe('Page404 component', () => {
  it('displays the 404 page when navigating to an invalid route', () => {
    render(
      <Routes>
        <Route path="/" element={<div>Home page</div>} />
        <Route path="*" element={<Page404 />} />
      </Routes>,
      {
        router: 'memory',
        routerProps: { initialEntries: ['/invalid-route'] },
      }
    );

    expect(screen.getByAltText('404')).toBeInTheDocument();
  });
});
