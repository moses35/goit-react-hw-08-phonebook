import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { logOut } from 'redux/auth/operationsAuth';
import {
  addContact,
  fetchContacts,
  deleteContact,
  patchContact,
} from 'redux/contacts/operationsContacts';
import { createStandaloneToast } from '@chakra-ui/react';

const { toast } = createStandaloneToast();

const handlePending = state => {
  state.isLoading = true;
};
const handleFulfilledGet = (state, action) => {
  state.isLoading = false;
  state.items.push(...action.payload);
  state.error = '';
};
const handleFulfilledCreate = (state, action) => {
  state.isLoading = false;
  state.items.push(action.payload);
  state.error = '';
  toast({
    title: 'Сontact added',
    status: 'success',
    duration: 9000,
    isClosable: true,
    position: 'bottom-right',
  });
};
const handleFulfilledDelete = (state, action) => {
  state.isLoading = false;
  state.items = state.items.filter(item => item.id !== action.payload.id);
  state.error = '';
  toast({
    title: 'Сontact deleted',
    status: 'success',
    duration: 9000,
    isClosable: true,
    position: 'bottom-right',
  });
};
const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
  toast({
    title: 'Something went wrong!',
    status: 'error',
    duration: 9000,
    isClosable: true,
    position: 'bottom-right',
  });
};
const handleFulfilledLogout = state => {
  state.items = [];
  state.isLoading = false;
  state.error = null;
};
const handleFulfilledPatchContact = (state, action) => {
  state.isLoading = false;
  state.error = null;
  const index = state.items.findIndex(item => item.id === action.payload.id);
  state.items.splice(index, 1, action.payload);
  toast({
    title: 'Сontact updated',
    status: 'success',
    duration: 9000,
    isClosable: true,
    position: 'bottom-right',
  });
};

export const contactsSlice = createSlice({
  name: 'phonebook',
  initialState: { items: [], isLoading: false, error: null },
  reducers: {
    clearContacts(state) {
      state.items = [];
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, handleFulfilledGet)
      .addCase(addContact.fulfilled, handleFulfilledCreate)
      .addCase(deleteContact.fulfilled, handleFulfilledDelete)
      .addCase(logOut.fulfilled, handleFulfilledLogout)
      .addCase(patchContact.pending, handlePending)
      .addCase(patchContact.fulfilled, handleFulfilledPatchContact)
      .addMatcher(
        isAnyOf(
          fetchContacts.pending,
          addContact.pending,
          deleteContact.pending,
          patchContact.pending
        ),
        handlePending
      )
      .addMatcher(
        isAnyOf(
          fetchContacts.rejected,
          addContact.rejected,
          deleteContact.rejected,
          logOut.rejected,
          patchContact.rejected
        ),
        handleRejected
      );
  },
});

export const { clearContacts } = contactsSlice.actions;
