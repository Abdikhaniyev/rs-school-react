import { useRoutes } from 'react-router-dom';
import App from './App';
import { Detailed } from './components';

export default function Router() {
  return useRoutes([
    { path: '/', element: <App /> },
    {
      path: '/character',
      element: <App />,
      children: [{ path: ':characterId', element: <Detailed /> }],
    },
    { path: '*', element: <>404</> },
  ]);
}
