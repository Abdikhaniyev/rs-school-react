import { render, screen, waitFor } from '../../__tests__/utils';
import Characters from './index';

describe('Characters component', () => {
  it('renders the correct number of cards', async () => {
    render(<Characters />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();

    await waitFor(() => {
      const cards = screen.getAllByTestId('character-card');
      expect(cards).toHaveLength(5);
    });
  });

  it('displays a message if no cards are present', async () => {
    render(<Characters />, {
      preloadedState: {
        layout: {
          search: 'empty',
          viewMode: 'grid',
        },
      },
    });
    await waitFor(() => {
      const message = screen.getByText('There is nothing here');
      expect(message).toBeInTheDocument();
    });
  });
});
