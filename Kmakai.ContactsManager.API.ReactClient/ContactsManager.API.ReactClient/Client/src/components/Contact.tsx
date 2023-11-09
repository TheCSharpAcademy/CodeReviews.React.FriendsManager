import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
// import { ContactType } from "../types";
import { useAppSelector, useAppDispatch } from "../features/hooks";
import { getContact, deleteContact } from "../features/contactsSlice";
import { FaUserEdit } from "react-icons/fa";
import { TiUserDeleteOutline } from "react-icons/ti";
import { LastContactType } from "../types";

const Contact: React.FC = () => {
  const { contactId } = useParams<{ contactId: string }>();
  const contact = useAppSelector((state) => state.contacts.contact);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function OnDelete() {
    if (confirm("Are you sure you want to delete this contact?")) {
      dispatch(deleteContact(+contactId!));
    } else {
      return;
    }

    setTimeout(() => {
      navigate(`/`);
    }, 1000);
  }

  useEffect(() => {
    dispatch(getContact(+contactId!));
  }, [dispatch, contactId]);

  return (
    <div className="flex gap-4">
      <div className="left text-lg">
        <div className="flex gap-2 font-semibold">Info</div>
        <hr />
        <div className="flex gap-2">
          <span className="font-bold text-slate-500">name:</span>
          <p>{contact?.name}</p>
        </div>

        <div className="flex gap-2">
          <span className="font-bold text-slate-500">email:</span>
          <p>{contact?.email}</p>
        </div>

        <div className="flex gap-2">
          <span className="font-bold text-slate-500">phone:</span>
          <p>{contact?.phone}</p>
        </div>

        <div className="flex gap-2">
          <span className="font-bold text-slate-500">relationship:</span>
          <p>{contact?.category.name}</p>
        </div>
      </div>
      <div className="right text-lg">
        <h1 className="font-semibold">Notes</h1>
        <hr />
        <p>{contact?.notes}</p>

        <div className="flex gap-2">
          <span className="font-bold text-slate-500">contacted on:</span>
          <span>
            {contact?.lastContactDate
              ? new Date(contact?.lastContactDate).toLocaleDateString()
              : ""}
          </span>
          by
          <p>{LastContactType[contact?.lastContact as number]}</p>
        </div>
        <button className="ms-auto">
          <Link
            to={`/contacts/${contact?.id}/edit`}
            className="flex items-center gap-2"
          >
            <FaUserEdit /> update
          </Link>
        </button>
        <button
          className=" text-red-500 flex items-center gap-2"
          onClick={() => OnDelete()}
        >
          <TiUserDeleteOutline /> delete
        </button>
      </div>
    </div>
  );
};

export default Contact;
