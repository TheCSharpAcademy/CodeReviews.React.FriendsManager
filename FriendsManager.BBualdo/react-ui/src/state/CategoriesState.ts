import { Category } from "@/models/Category";
import { atom } from "recoil";

const categoriesState = atom<Category[] | null | undefined>({
  key: "categoriesState",
  default: null,
});

const errorState = atom<string | null>({
  key: "categoriesError",
  default: null,
});

const isLoadingState = atom<boolean>({
  key: "isLoadingCategories",
  default: false,
});

export default { categoriesState, errorState, isLoadingState };
