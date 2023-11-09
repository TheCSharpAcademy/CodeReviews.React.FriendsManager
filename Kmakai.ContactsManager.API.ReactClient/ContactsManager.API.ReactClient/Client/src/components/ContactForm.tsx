import { useEffect, useState } from "react";
import { ContactType, ContactFrequency, LastContactType } from "../types";
import { useAppDispatch } from "../features/hooks";
import { addContact, getContacts } from "../features/contactsSlice";
import { useNavigate } from "react-router-dom";

const ContactForm: React.FC = () => {
  const [categories, setCategories] = useState([]);
  const [contact, setContact] = useState<ContactType>({
    id: 0,
    name: "",
    email: "",
    phone: "",
    notes: "",
    lastContact: 0,
    lastContactDate: new Date().toISOString(),
    desiredContactFrequency: 0,
    categoryId: 1,
    category: {
      id: 1,
      name: "family",
    },
  })!;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  async function saveContact(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const res = await dispatch(addContact(contact!)).unwrap();
      console.log(res);
      if (res) {
        const cont = await dispatch(getContacts()).unwrap();
        console.log(cont);
        setTimeout(() => {
          navigate(`/contacts/${cont[cont.length - 1].id}`);
        }, 1000);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function getCategories() {
    const response = await fetch(
      "https://localhost:7139/api/Contact/Categories"
    );
    const data = await response.json();
    console.log(data);
    setCategories(data);
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <form className="flex flex-col gap-2" onSubmit={saveContact}>
      <h1>New contact</h1>
      <hr />
      <div className="flex justify-between">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          placeholder="name"
          name="name"
          id="name"
          value={contact ? contact.name : ""}
          onChange={(e) => {
            setContact((prev) =>
              prev ? { ...prev, name: e.target.value } : prev
            );
          }}
          pattern="[A-Za-z ]+"
          required
        />
      </div>

      <div className="flex justify-between">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          placeholder="email"
          name="email"
          id="email"
          value={contact ? contact.email : ""}
          onChange={(e) => {
            setContact((prev) =>
              prev ? { ...prev, email: e.target.value } : prev
            );
          }}
          pattern={
            "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
          }
        />
      </div>

      <div className="flex justify-between">
        <label htmlFor="phone">Phone:</label>

        <input
          type="text"
          placeholder="123-456-7890"
          name="phone"
          id="phone"
          value={contact ? contact.phone : ""}
          onChange={(e) => {
            setContact((prev) =>
              prev ? { ...prev, phone: e.target.value } : prev
            );
          }}
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          required
        />
      </div>
      <div className="flex justify-between">
        <span>
          <label htmlFor="LastContactDate">Last Contacted:</label>
        </span>
        <input
          type="date"
          name="LastContactDate"
          id="LastContactDate"
          value={
            contact
              ? new Date(contact.lastContactDate).toISOString().split("T")[0]
              : ""
          }
          onChange={(e) => {
            setContact((prev) =>
              prev
                ? {
                    ...prev,
                    lastContactDate: new Date(e.target.value).toISOString(),
                  }
                : prev
            );
          }}
        />
      </div>

      <div className="flex justify-between">
        <span>
          <label htmlFor="LastContact">Contacted By:</label>
        </span>
        <select
          name="LastContact"
          id="LastContact"
          value={contact ? contact.lastContact : 0}
          onChange={(e) => {
            setContact((prev) =>
              prev ? { ...prev, lastContact: +e.target.value } : prev
            );
          }}
        >
          <option value={LastContactType.Email}>Email</option>
          <option value={LastContactType.Phone}>Phone</option>
          <option value={LastContactType.TextMessage}>Text Message</option>
          <option value={LastContactType.VideoCall}>Video Call</option>
          <option value={LastContactType.FaceToFace}>In Person</option>
        </select>
      </div>

      <div className="flex justify-between">
        <span>
          <label htmlFor="CategoryId">Relationship:</label>
        </span>
        <select
          name="CategoryId"
          id="CategoryId"
          value={contact ? contact.categoryId : 0}
          onChange={(e) => {
            setContact((prev) =>
              prev ? { ...prev, categoryId: +e.target.value } : prev
            );
          }}
        >
          {categories.map((category: { id: number; name: string }) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-between">
        <span>
          <label htmlFor="DesiredContactFrequency">Contact Frequency:</label>
        </span>
        <select
          name="DesiredContactFrequency"
          id="DesiredContactFrequency"
          value={contact ? contact.desiredContactFrequency : ""}
          onChange={(e) => {
            setContact((prev) =>
              prev
                ? { ...prev, desiredContactFrequency: +e.target.value }
                : prev
            );
          }}
        >
          <option value={ContactFrequency.Daily}>Daily</option>
          <option value={ContactFrequency.Weekly}>Weekly</option>
          <option value={ContactFrequency.Monthly}>Monthly</option>
          <option value={ContactFrequency.Quarterly}>Quarterly</option>
          <option value={ContactFrequency.Yearly}>Yearly</option>
        </select>
      </div>

      <textarea
        name="Notes"
        id="Notes"
        cols={30}
        rows={5}
        value={contact ? contact.notes : ""}
        onChange={(e) => {
          setContact((prev) =>
            prev ? { ...prev, notes: e.target.value } : prev
          );
        }}
      ></textarea>

      <button className="bg-slate-600 text-white rounded px-3 py-2">
        save contact
      </button>
    </form>
  );
};

export default ContactForm;
