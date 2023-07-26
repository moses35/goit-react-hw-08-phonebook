import { nanoid } from 'nanoid';
import {
  Form,
  ErrorMessage,
  Button,
} from 'components/ContactForm/ContactForm.styled';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { registerUser } from 'redux/auth/operationsAuth';
import {
  FormLabel,
  FormControl,
  Input,
  InputLeftElement,
  InputGroup,
} from '@chakra-ui/react';
import { AtSignIcon, EmailIcon, UnlockIcon } from '@chakra-ui/icons';

const newUserSchema = yup.object().shape({
  name: yup
    .string()
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    )
    .required(),
});

export const RegisterForm = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { name: '', email: '', password: '' },
    resolver: yupResolver(newUserSchema),
  });
  const inputName = nanoid();
  const inputPassword = nanoid();
  const inputEmail = nanoid();

  return (
    <>
      <Form
        onSubmit={handleSubmit(data => {
          dispatch(
            registerUser({
              name: data.name,
              email: data.email,
              password: data.password,
            })
          );
          reset();
        })}
      >
        <FormControl isInvalid={errors.name}>
          <FormLabel htmlFor={inputName}>Name</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <AtSignIcon color="gray.300" />
            </InputLeftElement>
            <Input
              type="text"
              {...register('name', { required: true })}
              id={inputName}
            />
          </InputGroup>
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
          <FormLabel htmlFor={inputEmail}>Email</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <EmailIcon color="gray.300" />
            </InputLeftElement>
            <Input
              type="email"
              placeholder="example@mail.com"
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
            Register
          </Button>
        </FormControl>
      </Form>
    </>
  );
};
