import { nanoid } from 'nanoid';
import { Button, Form } from 'components/ContactForm/ContactForm.styled';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { loginUser } from 'redux/auth/operationsAuth';
import {
  FormLabel,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { EmailIcon, UnlockIcon } from '@chakra-ui/icons';

export const LoginForm = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { email: '', password: '' },
  });

  const inputPassword = nanoid();
  const inputEmail = nanoid();

  return (
    <>
      <Form
        onSubmit={handleSubmit(data => {
          dispatch(
            loginUser({
              email: data.email,
              password: data.password,
            })
          );
          console.log(data);
          reset();
        })}
      >
        <FormControl isInvalid={errors.name}>
          <FormLabel htmlFor={inputEmail}>Email</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <EmailIcon color="gray.300" />
            </InputLeftElement>
            <Input
              type="email"
              {...register('email', { required: true })}
              id={inputEmail}
            />
          </InputGroup>
          <FormLabel htmlFor={inputPassword}>Password</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <UnlockIcon color="gray.300" />
            </InputLeftElement>
            <Input
              type="password"
              {...register('password', { required: true })}
              id={inputPassword}
            />
          </InputGroup>
          <Button colorScheme="teal" size="sm" type="submit">
            Log In
          </Button>
        </FormControl>
      </Form>
    </>
  );
};
