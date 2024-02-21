import { useEffect } from "react";
import { ContactType } from "../types";
import Contact from "./ContactCard";
import { useAppDispatch, useAppSelector } from "../features/hooks";
import { getContacts } from "../features/contactsSlice";

// type listProps = {
//   contacts: ContactType[];
// };

const ContactsList: React.FC = () => {
  const contacts = useAppSelector((state) => state.contacts.contacts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);
  return (
    <div>
      {" "}
      <h1 className="font-bold uppercase text-slate-600">Contacts</h1>
      <hr />
      <div className="contacts-cards mt-2">
        <div className="flex gap-2 flex-wrap">
          {contacts.length &&
            contacts.map((contact: ContactType) => (
              <Contact key={contact.id} contact={contact} />
            ))}
        </div>
      </div>{" "}
    </div>
  );
};

export default ContactsList;
