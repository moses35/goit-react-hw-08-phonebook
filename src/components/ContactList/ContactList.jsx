import PropTypes from 'prop-types';
import {
  ContactsBlock,
  List,
  ListItem,
  UpdateButtonBlock,
} from 'components/ContactList/ContactList.styled';
import { deleteContact } from 'redux/contacts/operationsContacts';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Button } from 'components/ContactForm/ContactForm.styled';
import { Modal } from 'components/Modal/Modal';
import { Text } from '@chakra-ui/react';

export const ContactList = ({ contacts }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [idContact, setContactId] = useState(null);
  const modalOpen = id => {
    setIsOpen(true);
    setContactId(id);
  };
  const modalClose = () => {
    setIsOpen(false);
  };

  return (
    <ContactsBlock>
      <List>
        {contacts.map(({ id, name, number }) => (
          <ListItem key={id}>
            <span>
              <Text fontSize="18px" as="cite">
                {name}: {number}
              </Text>
            </span>
            <UpdateButtonBlock>
              <Button
                colorScheme="yellow"
                size="sm"
                type="button"
                leftIcon={<EditIcon boxSize={4} />}
                onClick={() => {
                  modalOpen(id);
                  setContactName(name);
                  setContactNumber(number);
                }}
              >
                Update
              </Button>
              <Button
                colorScheme="red"
                size="sm"
                type="button"
                onClick={() => {
                  dispatch(deleteContact(id));
                }}
              >
                <DeleteIcon boxSize={4} />
              </Button>
            </UpdateButtonBlock>
          </ListItem>
        ))}
      </List>
      {isOpen && (
        <Modal
          id={idContact}
          contactName={contactName}
          contactNumber={contactNumber}
          closeModal={modalClose}
        />
      )}
    </ContactsBlock>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
