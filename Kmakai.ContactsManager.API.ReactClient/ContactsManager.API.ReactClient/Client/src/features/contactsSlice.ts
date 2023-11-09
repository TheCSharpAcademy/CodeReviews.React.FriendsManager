import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { ContactType } from "../types";

interface ContactsState {
  contacts: ContactType[];
  contact: ContactType | null;
}

const initialState: ContactsState = {
  contacts: [],
  contact: null,
};

export const getContacts = createAsyncThunk(
  "contacts/getContacts",
  async () => {
    const response = await fetch("https://localhost:7139/api/Contact");
    const data = await response.json();
    console.log(data);
    return data;
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contact: ContactType) => {
    const response = await fetch("https://localhost:7139/api/Contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact),
    });

    const data = await response.json();
    return data;
  }
);

export const updateContact = createAsyncThunk(
  "contacts/updateContact",
  async (contact: ContactType) => {
    const response = await fetch(
      `https://localhost:7139/api/Contact/${contact?.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  }
);

export const getContact = createAsyncThunk(
  "contacts/getContact",
  async (id: number) => {
    const response = await fetch(`https://localhost:7139/api/Contact/${id}`);
    const data = await response.json();
    console.log(data);
    return data;
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (id: number) => {
    const response = await fetch(`https://localhost:7139/api/Contact/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  }
);

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getContacts.fulfilled, (state, action) => {
      state.contacts = action.payload;
    });
    builder.addCase(getContact.fulfilled, (state, action) => {
      state.contact = action.payload;
    });
    builder.addCase(addContact.fulfilled, (state, action) => {
      state.contacts.push(action.payload);
    });
  },
});

// export const {} = contactsSlice.actions;

export const selectContacts = (state: RootState) => state.contacts.contacts;

export default contactsSlice.reducer;
