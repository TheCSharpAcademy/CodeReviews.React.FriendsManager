import { useAppSelector, useAppDispatch } from "./features/hooks";
import { useEffect } from "react";
import "./App.css";
// import ContactForm from "./components/ContactForm";
// import ContactEditForm from "./components/ContactEditForm";
// import ContactsList from "./components/ContactsList";
import { Link, Outlet } from "react-router-dom";
import { getContacts } from "./features/contactsSlice";
import { IoHome } from "react-icons/io5";

function App() {
  const { contacts } = useAppSelector((state) => state.contacts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (contacts.length === 0) {
      dispatch(getContacts());
    }
  });
  return (
    <>
      <div className="main-container flex mx-auto border shadow-lg rounded p-2 h-[100dvh]">
        <div className="side-panel space-y-2 shadow p-4 hidden sm:block">
          <h1 className="font-bold uppercase text-slate-600">
            <Link to="/" className="flex items-center gap-2">
              <IoHome /> home
            </Link>
          </h1>
          <form action="">
            <input type="text" placeholder="Search" id="q" name="q" />
          </form>
          <hr className="" />
          <Link to="/contacts/new">
            <button className="bg-slate-600 text-white rounded px-3 py-2 mt-2">
              new contact
            </button>
          </Link>
          <div className="contacts-list">
            <ul className="flex flex-col gap-2">
              {contacts.map((contact: { name: string; id: number }) => (
                <Link
                  key={contact.id}
                  to={`/contacts/${contact.id}`}
                  className="border border-slate-100 p-2 rounded font-bold text-slate-600 hover:bg-slate-700 hover:text-white"
                >
                  <li className="">{contact.name}</li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
        <div className="main-panel p-4">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
