import { Route, Routes } from 'react-router';

import { Layout } from './components';
import { ControlledForm, Home, UncontrolledForm } from './pages';

import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/uncontrolled" element={<UncontrolledForm />} />
        <Route path="/controlled" element={<ControlledForm />} />
      </Route>
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
}

export default App;
