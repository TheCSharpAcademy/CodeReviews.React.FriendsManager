import { ContactTypes } from "@/enums/ContactTypes";

export const contactTypeToString = (type: ContactTypes): string => {
  switch (type) {
    case ContactTypes.Call:
      return "Call";
    case ContactTypes.Text:
      return "Text";
    case ContactTypes.Meetup:
      return "Meetup";
    default:
      return "Unknown";
  }
};
