enum LastContactType {
  Email,
  Phone,
  TextMessage,
  VideoCall,
  FaceToFace,
}

enum ContactFrequency {
  Daily,
  Weekly,
  Monthly,
  Quarterly,
  Yearly,
}

export type ContactType = {
  id: number;
  name: string;
  email: string;
  phone: string;
  notes: string;
  lastContact: number;
  lastContactDate: string;
  desiredContactFrequency: number;
  categoryId: number;
  category: CategoryType;
};

export type CategoryType = {
  id: number;
  name: string;
};

export { LastContactType, ContactFrequency };
