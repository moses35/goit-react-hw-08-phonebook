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
import { patchContact } from 'redux/contacts/operationsContacts';
import { getContacts } from 'redux/contacts/selectorsContacts';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  FormLabel,
  FormControl,
  Input,
  InputLeftElement,
  InputGroup,
  Heading,
} from '@chakra-ui/react';
import { AtSignIcon, PhoneIcon } from '@chakra-ui/icons';
import { ButtonsBlock } from './UpdateForm.styled';

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

export const UpdateForm = ({ id, contactName, contactNumber, closeModal }) => {
  const { items } = useSelector(getContacts);
  const dispatch = useDispatch();
  const [formContactName, setFormContactName] = useState('');
  const [formContactNumber, setFormContactNumber] = useState('');
  const inputName = nanoid();
  const inputNumber = nanoid();

  useEffect(() => {
    setFormContactName(contactName);
    setFormContactNumber(contactNumber);
  }, [contactName, contactNumber]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { name: contactName, phone: contactNumber },
    resolver: yupResolver(contactSchema),
  });

  const handleNameChange = e => {
    const { value } = e.currentTarget;
    setFormContactName(value);
  };

  const handleNumberChange = e => {
    const { value } = e.currentTarget;
    setFormContactNumber(value);
  };

  const ckeckDuplicatedContact = (id, data) => {
    const normalizaName = data.name.toLocaleLowerCase();

    //check for duplicate name
    const result = items.find(
      item => normalizaName === item.name.toLocaleLowerCase()
    );

    //checking if find() return 'object'
    if (typeof result === 'object') {
      window.alert(result.name + ' is already in contacts');
    } else {
      dispatch(
        patchContact({ contactId: id, name: data.name, number: data.phone })
      );
      closeModal();
    }
  };

  return (
    <>
      <Form
        onSubmit={handleSubmit(data => {
          ckeckDuplicatedContact(id, data);
          reset();
        })}
      >
        <Heading fontSize="1xl">Сhange contact</Heading>
        <FormControl isInvalid={errors.name}>
          <FormLabel htmlFor={inputName}>Name</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <AtSignIcon color="gray.300" />
            </InputLeftElement>

            <Input
              type="text"
              {...register('name', {
                required: true,
              })}
              id={inputName}
              onChange={handleNameChange}
              value={formContactName}
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
              {...register('phone', { required: true })}
              id={inputNumber}
              onChange={handleNumberChange}
              value={formContactNumber}
            />
          </InputGroup>
          <ErrorMessage>{errors.phone?.message}</ErrorMessage>
          <ButtonsBlock>
            <Button colorScheme="teal" size="sm" type="submit">
              Update contact
            </Button>
            <Button
              colorScheme="red"
              size="sm"
              type="submit"
              onClick={() => closeModal()}
            >
              Close
            </Button>
          </ButtonsBlock>
        </FormControl>
      </Form>
    </>
  );
};

UpdateForm.propTypes = {
  id: PropTypes.string.isRequired,
  contactName: PropTypes.string.isRequired,
  contactNumber: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
