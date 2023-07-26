import { useAuth } from 'hooks/useAuth';
import { useDispatch } from 'react-redux';
import { logOut } from 'redux/auth/operationsAuth';
import { Text } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { UserBlock } from './UserMenu.styled';

export const UserMenu = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  return (
    <UserBlock>
      <Text fontSize="1xl">{user.email}</Text>
      <Button
        colorScheme="red"
        size="sm"
        type="button"
        onClick={() => dispatch(logOut())}
      >
        <Text fontSize="1xl">Logout</Text>
      </Button>
    </UserBlock>
  );
};
