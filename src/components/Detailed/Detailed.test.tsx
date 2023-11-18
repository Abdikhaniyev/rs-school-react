import { Route, Routes } from 'react-router-dom';
import { act, render, screen, waitFor } from '../../__tests__/utils';
import Detailed from './index';
import { character } from '../../mock/api/handler';

describe('Detailed component', () => {
  it('displays a loading indicator while fetching data', async () => {
    render(
      <Routes>
        <Route path="/rs-school-react/character/:characterId" element={<Detailed />} />
      </Routes>,
      {
        router: 'memory',
        routerProps: { initialEntries: ['/rs-school-react/character/1'] },
      }
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('displays the detailed card data', async () => {
    render(
      <Routes>
        <Route path="/rs-school-react/character/:characterId" element={<Detailed />} />
      </Routes>,
      {
        router: 'memory',
        routerProps: { initialEntries: ['/rs-school-react/character/1'] },
      }
    );
    await waitFor(() => {
      expect(screen.getByAltText(character.name)).toBeInTheDocument();
      expect(screen.getByText(character.status)).toBeInTheDocument();
      expect(screen.getByText(character.species)).toBeInTheDocument();
      expect(screen.getByText(character.gender)).toBeInTheDocument();
      expect(screen.getByText(character.origin.name)).toBeInTheDocument();
      expect(screen.getByText(character.location.name)).toBeInTheDocument();
    });
  });

  it('hides the component when the close button is clicked', async () => {
    render(
      <Routes>
        <Route path="/rs-school-react/" element={<div>Home</div>} />,
        <Route path="/rs-school-react/character/:characterId" element={<Detailed />} />
      </Routes>,
      {
        router: 'memory',
        routerProps: { initialEntries: ['/rs-school-react/character/1'] },
      }
    );

    await waitFor(() => {
      expect(screen.getByText(character.name)).toBeInTheDocument();
    });

    await act(async () => {
      waitFor(() => {
        screen.getByTestId('back').click();
        expect(screen.getByText('Home')).toBeInTheDocument();
      });
    });
  });
});
