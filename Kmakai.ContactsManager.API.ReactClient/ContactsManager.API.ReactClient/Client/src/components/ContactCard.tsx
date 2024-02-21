import { ContactType, ContactFrequency } from "../types";
import { Link } from "react-router-dom";

type contactProps = {
  contact: ContactType;
};

const ContactCard: React.FC<contactProps> = ({ contact }) => {
  function calculateShouldContact() {
    const today = new Date();
    const lastContactDate = new Date(contact.lastContactDate);
    const diff = Math.abs(today.getTime() - lastContactDate.getTime());
    const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    let frequency;
    console.log(ContactFrequency[contact.desiredContactFrequency]);
    switch (ContactFrequency[contact.desiredContactFrequency]) {
      case "Weekly":
        frequency = 7;
        break;
      case "Monthly":
        frequency = 30;
        break;
      case "Quarterly":
        frequency = 90;
        break;
      case "Yearly":
        frequency = 365;
        break;
      case "Daily":
        frequency = 1;
        break;
      default:
        frequency = 0;
    }

    console.log(diffDays, frequency, contact.name);
    return diffDays > frequency;
  }
  return (
    <>
      <Link to={`/contacts/${contact.id}`}>
        <div
          className={`border p-2 rounded shadow-sm text-slate-500 font-semibold hover:-translate-y-0.5 w-[240px] ${
            calculateShouldContact() ? "bg-red-100" : "bg-green-100"
          }`}
        >
          <div className="flex gap-2">
            <span>Name:</span>
            <p>{contact.name}</p>
          </div>

          <div className="flex gap-2">
            <span>Email:</span>
            <p>{contact.email}</p>
          </div>

          <div className="flex gap-2">
            <span>Phone:</span>
            <p>{contact.phone}</p>
          </div>

          <div className="flex gap-2">
            <span>Relation:</span>
            <p>{contact.category.name}</p>
          </div>
          <p className="">
            {ContactFrequency[contact.desiredContactFrequency]}
          </p>
        </div>
      </Link>
    </>
  );
};

export default ContactCard;
