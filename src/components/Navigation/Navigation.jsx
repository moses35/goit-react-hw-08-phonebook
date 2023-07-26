import { NavLink } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';
import { Nav } from 'components/AppBar/AppBar.styled';
import { Highlight } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { checkCurrentPage } from 'globalFunctions/checkCurrentPage';
import { Text } from '@chakra-ui/react';

export const Navigation = () => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  const activePage = checkCurrentPage(location);

  return (
    <Nav>
      <NavLink to="/">
        <Text fontSize="1xl">
          <Highlight
            query={activePage}
            styles={{ px: '5', py: '1', bg: 'orange.100', rounded: 'full' }}
          >
            Home
          </Highlight>
        </Text>
      </NavLink>

      {isLoggedIn && (
        <NavLink to="/contacts">
          <Text fontSize="1xl">
            <Highlight
              query={activePage}
              styles={{ px: '5', py: '1', bg: 'orange.100', rounded: 'full' }}
            >
              Contacts
            </Highlight>
          </Text>
        </NavLink>
      )}
    </Nav>
  );
};
