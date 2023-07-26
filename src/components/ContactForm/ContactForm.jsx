import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import {
  Form,
  ErrorMessage,
  Button,
} from 'components/ContactForm/ContactForm.styled';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  FormLabel,
  FormControl,
  Input,
  InputLeftElement,
  InputGroup,
} from '@chakra-ui/react';
import { AtSignIcon, PhoneIcon } from '@chakra-ui/icons';

const contactSchema = yup.object().shape({
  name: yup
    .string()
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    )
    .required(),
  phone: yup
    .string()
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required(),
});

export const ContactForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { name: '', phone: '' },
    resolver: yupResolver(contactSchema),
  });
  const inputName = nanoid();
  const inputNumber = nanoid();

  return (
    <>
      <Form
        onSubmit={handleSubmit(data => {
          onSubmit({ ...data });
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
              placeholder="Contact name"
              {...register('name', { required: true })}
              id={inputName}
            />
          </InputGroup>
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
          <FormLabel htmlFor={inputNumber}>Number</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <PhoneIcon color="gray.300" />
            </InputLeftElement>
            <Input
              type="tel"
              placeholder="Phone number"
              {...register('phone', { required: true })}
              id={inputNumber}
            />
          </InputGroup>
          <ErrorMessage>{errors.phone?.message}</ErrorMessage>
          <Button colorScheme="teal" size="sm" type="submit">
            Add contact
          </Button>
        </FormControl>
      </Form>
    </>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
