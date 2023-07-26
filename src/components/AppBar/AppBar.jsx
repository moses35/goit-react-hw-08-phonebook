import { HeaderElement } from 'components/AppBar/AppBar.styled';
import { Navigation } from 'components/Navigation/Navigation';
import { UserMenu } from 'components/UserMenu/UserMenu';
import { AuthNav } from 'components/AuthNav/AuthNav';
import { useAuth } from 'hooks/useAuth';

const Header = () => {
  const { isLoggedIn } = useAuth();
  return (
    <HeaderElement>
      <div>
        <Navigation />
      </div>
      <div>{isLoggedIn ? <UserMenu /> : <AuthNav />}</div>
    </HeaderElement>
  );
};
export default Header;
