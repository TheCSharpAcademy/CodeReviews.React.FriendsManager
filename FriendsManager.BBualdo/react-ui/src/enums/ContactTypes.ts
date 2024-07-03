export enum ContactTypes {
  Call,
  Text,
  Meetup,
}

export const contactTypeOptions = Object.keys(ContactTypes)
  .filter((key) => isNaN(Number(key)))
  .map((key) => ({
    label: key,
    value: ContactTypes[key as keyof typeof ContactTypes],
  }));
