import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import {
  FormBlock,
  LoadingContainer,
  RequestError,
} from 'components/App/App.styled';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from 'redux/filter/filterSlice';
import { clearContacts } from 'redux/contacts/contactsSlice';
import { useEffect, useRef } from 'react';
import { addContact, fetchContacts } from 'redux/contacts/operationsContacts';
import { Loader } from 'components/Loader/Loader';
import { getContacts } from 'redux/contacts/selectorsContacts';
import { getFilter } from 'redux/filter/selectorsFilter';
import { Heading } from '@chakra-ui/react';

export const ContactsPage = () => {
  const { items, isLoading, error } = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const valueRef = useRef(true);
  const firstRender = useRef(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (valueRef.current) {
      valueRef.current = false;
      dispatch(fetchContacts());
    }
    return () => {
      dispatch(clearContacts());
    };
  }, [dispatch]);

  const formSubmitHandler = data => {
    duplicatedContact(data);
  };

  const changeFilter = e => {
    dispatch(setFilter(e.currentTarget.value));
  };

  const getVisibleContacts = () => {
    if (items) {
      const normalizaFilter = filter.toLowerCase();
      return items.filter(item =>
        item.name.toLocaleLowerCase().includes(normalizaFilter)
      );
    }
  };

  const duplicatedContact = data => {
    const normalizaName = data.name.toLocaleLowerCase();

    //check for duplicate name
    const result = items.find(
      item => normalizaName === item.name.toLocaleLowerCase()
    );

    //checking if find() return 'object'
    if (typeof result === 'object') {
      window.alert(result.name + ' is already in contacts');
    } else {
      dispatch(addContact({ name: data.name, number: data.phone }));
      firstRender.current = false;
    }
  };

  const visibleContacts = getVisibleContacts();

  return (
    <>
      <FormBlock>
        <Heading fontSize="3xl">Phonebook</Heading>
      </FormBlock>
      <FormBlock>
        <ContactForm onSubmit={formSubmitHandler} />
      </FormBlock>
      <FormBlock>
        <Heading fontSize="2xl">Contacts</Heading>
      </FormBlock>
      <LoadingContainer>
        <Filter onChange={changeFilter} />
        {isLoading && <Loader />}
      </LoadingContainer>

      {items.length > 0 ? (
        <ContactList contacts={visibleContacts} />
      ) : (
        !isLoading && <p>No contacts</p>
      )}
      {error && <RequestError>{error}</RequestError>}
    </>
  );
};

export default ContactsPage;
