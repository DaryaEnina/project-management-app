import { Outlet } from 'react-router-dom';
import Footer from '../Footer';
import Header from '../Header';

import './template.scss';

function Template() {
  return (
    <>
      <Header />
      <main className="main-container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Template;
