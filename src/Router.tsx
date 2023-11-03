import { useRoutes } from 'react-router-dom';
import App from './App';
import { Detailed } from './components';

const home = import.meta.env.VITE_HOME_PAGE;

export default function Router() {
  return useRoutes([
    { path: home, element: <App /> },
    {
      path: `${home}/character`,
      element: <App />,
      children: [{ path: ':characterId', element: <Detailed /> }],
    },
    { path: '*', element: <>404</> },
  ]);
}
