import { Outlet } from 'react-router';

import { Footer, Header } from '.';

export default function Layout() {
  return (
    <div className="layout">
      <Header />

      <main className="container">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
