import Header from 'components/AppBar/AppBar';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from 'components/App/App.styled';
const Layout = () => {
  return (
    <>
      <Header />
      <Container>
        <Suspense>
          <Outlet />
        </Suspense>
      </Container>
    </>
  );
};
export default Layout;
