import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Highlight } from '@chakra-ui/react';
import { checkCurrentPage } from 'globalFunctions/checkCurrentPage';
import { Link, AuthBlock } from './AuthNav.styled';
import { Text } from '@chakra-ui/react';

export const AuthNav = () => {
  const location = useLocation();
  const activePage = checkCurrentPage(location);

  return (
    <AuthBlock>
      <Link to="/register">
        <Text fontSize="1xl">
          <Highlight
            query={activePage}
            styles={{ px: '5', py: '1', bg: 'orange.100', rounded: 'full' }}
          >
            Register
          </Highlight>
        </Text>
      </Link>

      <NavLink to="/login">
        <Text fontSize="1xl">
          <Highlight
            query={activePage}
            styles={{ px: '5', py: '1', bg: 'orange.100', rounded: 'full' }}
          >
            Log In
          </Highlight>
        </Text>
      </NavLink>
    </AuthBlock>
  );
};
